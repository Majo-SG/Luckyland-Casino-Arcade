import { PartialType } from '@nestjs/mapped-types';
import { CreateCanjeDto } from './create-canje.dto';

export class UpdateCanjeDto extends PartialType(CreateCanjeDto) {}
