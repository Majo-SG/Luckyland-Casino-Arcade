import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidasService } from './partidas.service';
import { PartidasController } from './partidas.controller';
import { Partida, PartidaSchema } from './schemas/partida.schema';
import { JugadoresModule } from '../jugadores/jugadores.module';
import { ActividadesModule } from '../actividades/actividades.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partida.name, schema: PartidaSchema }]),
    JugadoresModule,
    ActividadesModule,
  ],
  controllers: [PartidasController],
  providers: [PartidasService],
})
export class PartidasModule {}
