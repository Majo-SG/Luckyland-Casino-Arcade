import { IsIn, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateActividadDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsIn(['mesa', 'maquina'])
  tipo: string;

  @IsNumber()
  @Min(0)
  costoEntrada: number;
}
