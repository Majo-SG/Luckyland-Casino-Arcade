import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JugadoresService } from './jugadores.service';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';

@Controller('jugadores')
export class JugadoresController {
  constructor(private readonly jugadoresService: JugadoresService) {}

  @Post()
  create(@Body() dto: CreateJugadorDto) {
    return this.jugadoresService.create(dto);
  }

  @Get()
  findAll() {
    return this.jugadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.jugadoresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateJugadorDto) {
    return this.jugadoresService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.jugadoresService.remove(id);
  }
}
