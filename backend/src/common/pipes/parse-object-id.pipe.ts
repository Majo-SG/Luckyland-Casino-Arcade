import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

// Pipe reutilizable: valida que el :id de la URL sea un ObjectId válido
// de MongoDB ANTES de llegar al service. Si no lo es, responde 400
// ("ID inválido") en vez de un 500 genérico de MongoDB.
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string, _metadata: ArgumentMetadata): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`"${value}" no es un ID válido de MongoDB`);
    }
    return value;
  }
}
