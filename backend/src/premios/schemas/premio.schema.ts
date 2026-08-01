import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PremioDocument = Premio & Document;

@Schema({ collection: 'premios' })
export class Premio {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, min: 0 })
  costoFichas: number;
}

export const PremioSchema = SchemaFactory.createForClass(Premio);
