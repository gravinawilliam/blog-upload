import 'dotenv/config';

const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.API_PORT || 4123,
  dataBaseDefault: {
    type: process.env.DB_DEFAULT_TYPE,
    host: process.env.DB_DEFAULT_HOST,
    port: process.env.DB_DEFAULT_PORT,
    username: process.env.DB_DEFAULT_USERNAME,
    password: process.env.DB_DEFAULT_PASSWORD,
    database: process.env.DB_DEFAULT_DATABASE,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
};

export default envConfig;
