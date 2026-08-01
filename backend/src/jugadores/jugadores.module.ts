import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JugadoresService } from './jugadores.service';
import { JugadoresController } from './jugadores.controller';
import { Jugador, JugadorSchema } from './schemas/jugador.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jugador.name, schema: JugadorSchema }]),
  ],
  controllers: [JugadoresController],
  providers: [JugadoresService],
  exports: [MongooseModule],
})
export class JugadoresModule {}
