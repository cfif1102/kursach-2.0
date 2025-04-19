import { IConfig } from '@types';
import { cleanEnv, str } from 'envalid';

export const config = (): IConfig => {
  const env = cleanEnv(process.env, {
    DB_NAME: str(),
  });

  const conf: IConfig = {
    db: {
      name: env.DB_NAME,
    },
  };

  return conf;
};
