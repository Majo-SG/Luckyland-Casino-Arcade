import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JugadoresModule } from './jugadores/jugadores.module';
import { ActividadesModule } from './actividades/actividades.module';
import { PartidasModule } from './partidas/partidas.module';
import { PremiosModule } from './premios/premios.module';
import { CanjesModule } from './canjes/canjes.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/casino_db',
    ),
    JugadoresModule,
    ActividadesModule,
    PartidasModule,
    PremiosModule,
    CanjesModule,
    ReportesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
