import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActividadDocument = Actividad & Document;

@Schema({ collection: 'actividades' })
export class Actividad {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, enum: ['mesa', 'maquina'] })
  tipo: string;

  @Prop({ required: true, min: 0 })
  costoEntrada: number;
}

export const ActividadSchema = SchemaFactory.createForClass(Actividad);
