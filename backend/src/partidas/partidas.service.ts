import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partida, PartidaDocument } from './schemas/partida.schema';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';

@Injectable()
export class PartidasService {
  constructor(
    @InjectModel(Partida.name) private partidaModel: Model<PartidaDocument>,
  ) {}

  create(dto: CreatePartidaDto) {
    const partida = new this.partidaModel({
      ...dto,
      fecha: dto.fecha ?? new Date(),
    });
    return partida.save();
  }

  // populate() trae el documento completo de jugador y actividad,
  // no solo el ObjectId -- así se ve la relación resuelta.
  findAll() {
    return this.partidaModel
      .find()
      .populate('jugadorId')
      .populate('actividadId')
      .exec();
  }

  async findOne(id: string) {
    const partida = await this.partidaModel
      .findById(id)
      .populate('jugadorId')
      .populate('actividadId')
      .exec();
    if (!partida) throw new NotFoundException(`Partida ${id} no encontrada`);
    return partida;
  }

  async update(id: string, dto: UpdatePartidaDto) {
    const partida = await this.partidaModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!partida) throw new NotFoundException(`Partida ${id} no encontrada`);
    return partida;
  }

  async remove(id: string) {
    const partida = await this.partidaModel.findByIdAndDelete(id).exec();
    if (!partida) throw new NotFoundException(`Partida ${id} no encontrada`);
    return partida;
  }
}
