import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CanjesService } from './canjes.service';
import { CanjesController } from './canjes.controller';
import { Canje, CanjeSchema } from './schemas/canje.schema';
import { JugadoresModule } from '../jugadores/jugadores.module';
import { PremiosModule } from '../premios/premios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Canje.name, schema: CanjeSchema }]),
    JugadoresModule,
    PremiosModule,
  ],
  controllers: [CanjesController],
  providers: [CanjesService],
})
export class CanjesModule {}
