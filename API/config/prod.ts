import { AppConfig } from './types';

const prodConfig: AppConfig = {
  db: {
    dialect: 'postgres',
    database: process.env.DATABASE_NAME || 'ponto-tracker',
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5432,
    autoLoadModels: false,
    synchronize: false,
    logging: false,
  },
};

export default prodConfig;
