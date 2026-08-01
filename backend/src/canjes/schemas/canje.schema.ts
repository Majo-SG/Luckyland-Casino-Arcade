import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CanjeDocument = Canje & Document;

@Schema({ collection: 'canjes' })
export class Canje {
  @Prop({ type: Types.ObjectId, ref: 'Jugador', required: true })
  jugadorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Premio', required: true })
  premioId: Types.ObjectId;

  @Prop({ required: true, default: () => new Date() })
  fecha: Date;
}

export const CanjeSchema = SchemaFactory.createForClass(Canje);
