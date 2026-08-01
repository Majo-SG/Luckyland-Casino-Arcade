import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CanjesService } from './canjes.service';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { CreateCanjeDto } from './dto/create-canje.dto';
import { UpdateCanjeDto } from './dto/update-canje.dto';

@Controller('canjes')
export class CanjesController {
  constructor(private readonly canjesService: CanjesService) {}

  @Post()
  create(@Body() dto: CreateCanjeDto) {
    return this.canjesService.create(dto);
  }

  @Get()
  findAll() {
    return this.canjesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.canjesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateCanjeDto) {
    return this.canjesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.canjesService.remove(id);
  }
}
