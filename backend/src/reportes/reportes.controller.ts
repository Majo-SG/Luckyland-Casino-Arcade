import { Controller, Get, Param } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  // Consulta 1 (rúbrica): historial de partidas con nombre de jugador y actividad
  @Get('historial-partidas')
  historialPartidas() {
    return this.reportesService.historialPartidas();
  }

  // Consulta 2 (rúbrica): total de fichas gastadas en canjes por jugador
  @Get('total-canjes-por-jugador')
  totalCanjesPorJugador() {
    return this.reportesService.totalCanjesPorJugador();
  }

  // Implementación avanzada: saldo real calculado (no un campo manual)
  @Get('saldo/:jugadorId')
  saldoJugador(@Param('jugadorId', ParseObjectIdPipe) jugadorId: string) {
    return this.reportesService.saldoJugador(jugadorId);
  }

  // Innovación: leaderboard de jugadores
  @Get('leaderboard')
  leaderboard() {
    return this.reportesService.leaderboard();
  }
}
