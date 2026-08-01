import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jugador, JugadorDocument } from './schemas/jugador.schema';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';

@Injectable()
export class JugadoresService {
  constructor(
    @InjectModel(Jugador.name) private jugadorModel: Model<JugadorDocument>,
  ) {}

  create(dto: CreateJugadorDto) {
    const jugador = new this.jugadorModel({
      ...dto,
      fichas: dto.fichas ?? 0,
      fechaRegistro: new Date(),
    });
    return jugador.save();
  }

  findAll() {
    return this.jugadorModel.find().exec();
  }

  async findOne(id: string) {
    const jugador = await this.jugadorModel.findById(id).exec();
    if (!jugador) throw new NotFoundException(`Jugador ${id} no encontrado`);
    return jugador;
  }

  async update(id: string, dto: UpdateJugadorDto) {
    const jugador = await this.jugadorModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!jugador) throw new NotFoundException(`Jugador ${id} no encontrado`);
    return jugador;
  }

  async remove(id: string) {
    const jugador = await this.jugadorModel.findByIdAndDelete(id).exec();
    if (!jugador) throw new NotFoundException(`Jugador ${id} no encontrado`);
    return jugador;
  }
}
