import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Canje, CanjeDocument } from './schemas/canje.schema';
import { CreateCanjeDto } from './dto/create-canje.dto';
import { UpdateCanjeDto } from './dto/update-canje.dto';

@Injectable()
export class CanjesService {
  constructor(
    @InjectModel(Canje.name) private canjeModel: Model<CanjeDocument>,
  ) {}

  create(dto: CreateCanjeDto) {
    const canje = new this.canjeModel({ ...dto, fecha: dto.fecha ?? new Date() });
    return canje.save();
  }

  findAll() {
    return this.canjeModel.find().populate('jugadorId').populate('premioId').exec();
  }

  async findOne(id: string) {
    const canje = await this.canjeModel
      .findById(id)
      .populate('jugadorId')
      .populate('premioId')
      .exec();
    if (!canje) throw new NotFoundException(`Canje ${id} no encontrado`);
    return canje;
  }

  async update(id: string, dto: UpdateCanjeDto) {
    const canje = await this.canjeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!canje) throw new NotFoundException(`Canje ${id} no encontrado`);
    return canje;
  }

  async remove(id: string) {
    const canje = await this.canjeModel.findByIdAndDelete(id).exec();
    if (!canje) throw new NotFoundException(`Canje ${id} no encontrado`);
    return canje;
  }
}
