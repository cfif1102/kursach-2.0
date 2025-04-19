import { ConfigService } from '@nestjs/config';
import { IDbConfig } from '@types';

import { DataSource } from 'typeorm';

export const provider = {
  provide: DataSource,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const dbConfig = configService.get<IDbConfig>('db')!;

    const dataSource = new DataSource({
      type: 'sqlite',
      database: dbConfig.name,
      entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
      synchronize: true,
    });

    await dataSource.initialize();

    return dataSource;
  },
};
