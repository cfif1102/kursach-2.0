import { IConfig } from '@types';
import { cleanEnv, str } from 'envalid';
import * as path from 'path';

export const config = (): IConfig => {
  const env = cleanEnv(process.env, {
    DB_NAME: str(),
    DOCS_OUTPUT: str(),
    DOCS_TEMPLATES: str(),
  });

  const conf: IConfig = {
    db: {
      name: env.DB_NAME,
    },
    docs: {
      outFolder: path.join(process.cwd(), env.DOCS_OUTPUT),
      docsFolder: path.join(process.cwd(), env.DOCS_TEMPLATES),
    },
  };

  return conf;
};
