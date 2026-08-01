import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Premio, PremioDocument } from './schemas/premio.schema';
import { CreatePremioDto } from './dto/create-premio.dto';
import { UpdatePremioDto } from './dto/update-premio.dto';

@Injectable()
export class PremiosService {
  constructor(
    @InjectModel(Premio.name) private premioModel: Model<PremioDocument>,
  ) {}

  create(dto: CreatePremioDto) {
    return new this.premioModel(dto).save();
  }

  findAll() {
    return this.premioModel.find().exec();
  }

  async findOne(id: string) {
    const premio = await this.premioModel.findById(id).exec();
    if (!premio) throw new NotFoundException(`Premio ${id} no encontrado`);
    return premio;
  }

  async update(id: string, dto: UpdatePremioDto) {
    const premio = await this.premioModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!premio) throw new NotFoundException(`Premio ${id} no encontrado`);
    return premio;
  }

  async remove(id: string) {
    const premio = await this.premioModel.findByIdAndDelete(id).exec();
    if (!premio) throw new NotFoundException(`Premio ${id} no encontrado`);
    return premio;
  }
}
