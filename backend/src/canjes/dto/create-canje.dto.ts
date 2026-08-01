import { IsMongoId, IsOptional } from 'class-validator';

export class CreateCanjeDto {
  @IsMongoId()
  jugadorId: string;

  @IsMongoId()
  premioId: string;

  @IsOptional()
  fecha?: Date;
}
