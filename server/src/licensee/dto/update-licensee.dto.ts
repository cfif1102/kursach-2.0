import { PartialType } from '@nestjs/swagger';
import { CreateLicenseeDto } from './create-licensee.dto';

export class UpdateLicenseeDto extends PartialType(CreateLicenseeDto) {}
