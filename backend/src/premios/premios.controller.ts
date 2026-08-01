import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PremiosService } from './premios.service';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { CreatePremioDto } from './dto/create-premio.dto';
import { UpdatePremioDto } from './dto/update-premio.dto';

@Controller('premios')
export class PremiosController {
  constructor(private readonly premiosService: PremiosService) {}

  @Post()
  create(@Body() dto: CreatePremioDto) {
    return this.premiosService.create(dto);
  }

  @Get()
  findAll() {
    return this.premiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.premiosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdatePremioDto) {
    return this.premiosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.premiosService.remove(id);
  }
}
