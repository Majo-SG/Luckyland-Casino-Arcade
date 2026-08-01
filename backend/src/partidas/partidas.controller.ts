import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';

@Controller('partidas')
export class PartidasController {
  constructor(private readonly partidasService: PartidasService) {}

  @Post()
  create(@Body() dto: CreatePartidaDto) {
    return this.partidasService.create(dto);
  }

  @Get()
  findAll() {
    return this.partidasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.partidasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdatePartidaDto) {
    return this.partidasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.partidasService.remove(id);
  }
}
