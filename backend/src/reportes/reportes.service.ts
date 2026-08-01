import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Partida, PartidaDocument } from '../partidas/schemas/partida.schema';
import { Canje, CanjeDocument } from '../canjes/schemas/canje.schema';

@Injectable()
export class ReportesService {
  constructor(
    @InjectModel(Partida.name) private partidaModel: Model<PartidaDocument>,
    @InjectModel(Canje.name) private canjeModel: Model<CanjeDocument>,
  ) {}

  // Objetivo: historial de partidas con el nombre del jugador y de la
  // actividad (no solo IDs). Relación: partidas -> jugadores, partidas -> actividades
  historialPartidas() {
    return this.partidaModel.aggregate([
      {
        $lookup: {
          from: 'jugadores', // nombre de colección que genera Mongoose para "Jugador"
          localField: 'jugadorId',
          foreignField: '_id',
          as: 'jugador',
        },
      },
      { $unwind: '$jugador' },
      {
        $lookup: {
          from: 'actividades',
          localField: 'actividadId',
          foreignField: '_id',
          as: 'actividad',
        },
      },
      { $unwind: '$actividad' },
      {
        $project: {
          _id: 0,
          jugador: '$jugador.nombre',
          actividad: '$actividad.nombre',
          fichasGanadas: 1,
          fecha: 1,
        },
      },
    ]);
  }

  // Objetivo: total de fichas gastadas en canjes, por jugador.
  // Relación: canjes -> jugadores, canjes -> premios
  totalCanjesPorJugador() {
    return this.canjeModel.aggregate([
      {
        $lookup: {
          from: 'premios',
          localField: 'premioId',
          foreignField: '_id',
          as: 'premio',
        },
      },
      { $unwind: '$premio' },
      {
        $lookup: {
          from: 'jugadores',
          localField: 'jugadorId',
          foreignField: '_id',
          as: 'jugador',
        },
      },
      { $unwind: '$jugador' },
      {
        $group: {
          _id: '$jugador.nombre',
          totalFichasGastadas: { $sum: '$premio.costoFichas' },
          premiosCanjeados: { $push: '$premio.nombre' },
        },
      },
      { $sort: { totalFichasGastadas: -1 } },
    ]);
  }

  // "Implementación avanzada": saldo real de un jugador calculado con
  // agregación (suma de partidas - suma de canjes), en vez de un campo
  // manual que se pueda desincronizar.
  async saldoJugador(jugadorId: string) {
    const id = new Types.ObjectId(jugadorId);

    const [gananciasPartidas] = await this.partidaModel.aggregate([
      { $match: { jugadorId: id } },
      { $group: { _id: null, total: { $sum: '$fichasGanadas' } } },
    ]);

    const [gastoCanjes] = await this.canjeModel.aggregate([
      { $match: { jugadorId: id } },
      {
        $lookup: {
          from: 'premios',
          localField: 'premioId',
          foreignField: '_id',
          as: 'premio',
        },
      },
      { $unwind: '$premio' },
      { $group: { _id: null, total: { $sum: '$premio.costoFichas' } } },
    ]);

    const totalGanado = gananciasPartidas?.total ?? 0;
    const totalGastado = gastoCanjes?.total ?? 0;

    return {
      jugadorId,
      fichasGanadasPartidas: totalGanado,
      fichasGastadasCanjes: totalGastado,
      saldoCalculado: totalGanado - totalGastado,
    };
  }

  // "Innovación": leaderboard de los jugadores con más fichas ganadas.
  leaderboard() {
    return this.partidaModel.aggregate([
      { $group: { _id: '$jugadorId', totalGanado: { $sum: '$fichasGanadas' } } },
      {
        $lookup: {
          from: 'jugadores',
          localField: '_id',
          foreignField: '_id',
          as: 'jugador',
        },
      },
      { $unwind: '$jugador' },
      {
        $project: { _id: 0, jugador: '$jugador.nombre', totalGanado: 1 },
      },
      { $sort: { totalGanado: -1 } },
    ]);
  }
}
