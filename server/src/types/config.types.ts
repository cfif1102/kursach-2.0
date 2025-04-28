export interface IConfig {
  db: IDbConfig;
  docs: DocsConfig;
}

export interface IDbConfig {
  name: string;
}

export interface DocsConfig {
  outFolder: string;
  docsFolder: string;
}

export enum DocsTypes {
  ACT = 'act.docx',
  PASSPORT = 'passport.docx',
}
