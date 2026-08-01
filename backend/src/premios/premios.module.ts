import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PremiosService } from './premios.service';
import { PremiosController } from './premios.controller';
import { Premio, PremioSchema } from './schemas/premio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Premio.name, schema: PremioSchema }]),
  ],
  controllers: [PremiosController],
  providers: [PremiosService],
  exports: [MongooseModule],
})
export class PremiosModule {}
