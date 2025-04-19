import { Controller } from '@nestjs/common';
import { LicenseeService } from './licensee.service';

@Controller('licensee')
export class LicenseeController {
  constructor(private readonly licenseeService: LicenseeService) {}
}
