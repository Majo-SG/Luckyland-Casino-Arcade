import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePremioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @Min(0)
  costoFichas: number;
}
