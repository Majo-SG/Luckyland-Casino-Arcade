import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { Actividad, ActividadSchema } from './schemas/actividad.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Actividad.name, schema: ActividadSchema },
    ]),
  ],
  controllers: [ActividadesController],
  providers: [ActividadesService],
  exports: [MongooseModule],
})
export class ActividadesModule {}
