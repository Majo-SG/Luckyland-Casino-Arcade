import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateJugadorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  fichas?: number;
}
