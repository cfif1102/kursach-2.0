import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MinLength, ValidateNested, ArrayMinSize } from 'class-validator';
import { EqActDto, CreateActDto } from './create-act.dto';

export class EqPassportDto extends EqActDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  end: string;
}

export class CreatePassportDto extends OmitType(CreateActDto, ['equipments']) {
  @ApiProperty({ type: [EqPassportDto] })
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EqPassportDto)
  equipments: EqPassportDto[];

  @ApiProperty()
  @IsString()
  @MinLength(1)
  objectType: string;
}
