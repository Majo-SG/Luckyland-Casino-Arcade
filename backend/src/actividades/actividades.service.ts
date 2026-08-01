import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Actividad, ActividadDocument } from './schemas/actividad.schema';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectModel(Actividad.name)
    private actividadModel: Model<ActividadDocument>,
  ) {}

  create(dto: CreateActividadDto) {
    return new this.actividadModel(dto).save();
  }

  findAll() {
    return this.actividadModel.find().exec();
  }

  async findOne(id: string) {
    const actividad = await this.actividadModel.findById(id).exec();
    if (!actividad) throw new NotFoundException(`Actividad ${id} no encontrada`);
    return actividad;
  }

  async update(id: string, dto: UpdateActividadDto) {
    const actividad = await this.actividadModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!actividad) throw new NotFoundException(`Actividad ${id} no encontrada`);
    return actividad;
  }

  async remove(id: string) {
    const actividad = await this.actividadModel.findByIdAndDelete(id).exec();
    if (!actividad) throw new NotFoundException(`Actividad ${id} no encontrada`);
    return actividad;
  }
}
