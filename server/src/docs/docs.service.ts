import { CustomerService } from '@customer/customer.service';
import { FacilityService } from '@facility/facility.service';
import { LicenseeService } from '@licensee/licensee.service';
import { Injectable } from '@nestjs/common';
import { CreateActDto } from './dto/create-act.dto';
import { ConfigService } from '@nestjs/config';
import { DocsConfig, DocsTypes } from '@types';
import { EquipmentService } from '@equipment/equipment.service';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import * as fs from 'fs';
import * as path from 'path';
import { CreatePassportDto } from './dto/create-passport.dto';

@Injectable()
export class DocsService {
  private readonly outFolder: string;
  private readonly docsFolder: string;

  constructor(
    private readonly customerService: CustomerService,
    private readonly facilityService: FacilityService,
    private readonly licenseeService: LicenseeService,
    private readonly equipmentService: EquipmentService,
    configService: ConfigService,
  ) {
    const { outFolder, docsFolder } = configService.get<DocsConfig>('docs')!;

    this.outFolder = outFolder;
    this.docsFolder = docsFolder;
  }

  async createPassportDocument(dto: CreatePassportDto) {
    const { objectId, equipments, objectType } = dto;

    const eqs = await this.equipmentService.findByIds(equipments.map((eq) => eq.id));

    const facility = await this.facilityService.findOne(objectId);
    const customer = facility.customer;
    const licensee = await this.licenseeService.findByCustomer(customer.id);

    const data = {
      OBJECT_NAME: `${facility.name}`,
      OBJECT_TXT: `${facility.name} ${facility.address}`,
      OBJECT_TYPE: objectType,
      CUSTOMER: `${customer.name}`,
      LICENSEE: `${licensee.name}`,
      EQUIPMENT_LIST: eqs.map((eq, index) => ({
        EQUIPMENT_NAME: eq.name,
        EQUIPMENT_AMOUNT: equipments[index].amount,
        EQUIPMENT_END: equipments[index].end,
      })),
    };

    const document = this.writeDocument(
      DocsTypes.PASSPORT,
      data,
      `${Date.now()}_${facility.name}_${licensee.name}_PASSPORT.docx`,
    );

    return document;
  }

  async createActDocument(dto: CreateActDto) {
    const { objectId, equipments } = dto;

    const eqs = await this.equipmentService.findByIds(equipments.map((eq) => eq.id));

    const facility = await this.facilityService.findOne(objectId);
    const customer = facility.customer;
    const licensee = await this.licenseeService.findByCustomer(customer.id);

    const data = {
      CUSTOMER: `${customer.name}`,
      LICENSEE: `${licensee.name}`,
      OBJECT: `${facility.name} ${facility.address}`,
      YEAR: new Date().getFullYear(),
      EQUIPMENT_LIST: eqs.map((eq, index) => ({
        EQUIPMENT_NAME: eq.name,
        EQUIPMENT_AMOUNT: equipments[index].amount,
      })),
    };

    const document = this.writeDocument(
      DocsTypes.ACT,
      data,
      `${Date.now()}_${facility.name}_${licensee.name}_ACT.docx`,
    );

    return document;
  }

  writeDocument(docType: DocsTypes, data: Record<string, any>, docName: string) {
    const templatePath = path.resolve(__dirname, this.docsFolder, docType);
    const content = fs.readFileSync(templatePath, 'binary');

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(data);

    const buffer = doc.getZip().generate({
      type: 'nodebuffer',
    });

    fs.writeFileSync(path.join(this.outFolder, docName), buffer);

    return {
      buffer,
      name: docName,
    };
  }
}
