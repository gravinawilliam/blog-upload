import dotenv from 'dotenv';

import app from './app';
import envConfig from './config/env.config';

dotenv.config();

app.listen(envConfig.port || 5412, () => {
  if (envConfig.nodeEnv !== 'PROD') {
    // eslint-disable-next-line no-console
    console.log(`✅ OK ${envConfig.port || 3000}`);
  }
});
