import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Post()
  create(@Body() dto: CreateActividadDto) {
    return this.actividadesService.create(dto);
  }

  @Get()
  findAll() {
    return this.actividadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.actividadesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateActividadDto) {
    return this.actividadesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.actividadesService.remove(id);
  }
}
