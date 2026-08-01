import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class CreatePartidaDto {
  @IsMongoId()
  jugadorId: string;

  @IsMongoId()
  actividadId: string;

  @IsNumber()
  fichasGanadas: number;

  @IsOptional()
  fecha?: Date;
}
