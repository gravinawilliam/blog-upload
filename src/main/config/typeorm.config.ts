import { ConnectionOptions, createConnections } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import envConfig from './env.config';

const { dataBaseDefault, nodeEnv } = envConfig;

const dir = nodeEnv === 'DEV' ? 'src' : 'dist/src';
const extension = nodeEnv === 'DEV' ? 'ts' : 'js';

const typeormConfig: ConnectionOptions = {
  name: 'default',
  type: dataBaseDefault.type,
  host: dataBaseDefault.host,
  port: dataBaseDefault.port,
  username: dataBaseDefault.username,
  password: dataBaseDefault.password,
  database: dataBaseDefault.database,
  entities: [`./${dir}/infra/database/typeorm/entities/*.${extension}`],
  migrations: [`./${dir}/infra/database/typeorm/migrations/*.${extension}`],
  synchronize: false,
  cli: {
    migrationsDir: `./src/infra/database/typeorm/migrations/`,
  },
  namingStrategy: new SnakeNamingStrategy(),
} as ConnectionOptions;

createConnections([typeormConfig]);
