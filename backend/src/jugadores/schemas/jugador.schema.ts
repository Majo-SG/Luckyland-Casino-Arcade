import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JugadorDocument = Jugador & Document;

@Schema({ collection: 'jugadores' })
export class Jugador {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, default: 0, min: 0 })
  fichas: number;

  @Prop({ required: true, default: () => new Date() })
  fechaRegistro: Date;
}

export const JugadorSchema = SchemaFactory.createForClass(Jugador);
