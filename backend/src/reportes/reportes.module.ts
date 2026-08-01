import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { Partida, PartidaSchema } from '../partidas/schemas/partida.schema';
import { Canje, CanjeSchema } from '../canjes/schemas/canje.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Partida.name, schema: PartidaSchema },
      { name: Canje.name, schema: CanjeSchema },
    ]),
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
