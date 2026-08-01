import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PartidaDocument = Partida & Document;

@Schema({ collection: 'partidas' })
export class Partida {
  @Prop({ type: Types.ObjectId, ref: 'Jugador', required: true })
  jugadorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Actividad', required: true })
  actividadId: Types.ObjectId;

  // Puede ser negativo si el jugador pierde fichas en la partida
  @Prop({ required: true })
  fichasGanadas: number;

  @Prop({ required: true, default: () => new Date() })
  fecha: Date;
}

export const PartidaSchema = SchemaFactory.createForClass(Partida);
