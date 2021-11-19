import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import express from 'express';
import { errors as validationErrorsHandler } from 'celebrate';

import errorsHandler from '@shared/infra/http/handlers/errors';
import '@shared/infra/typeorm';

import envConfig from '@config/env.config';
import routes from './routes';

const app = express();
Sentry.init({
  dsn: envConfig.external.sentry.dsn,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(cors({}));

app.use(express.json());
app.use(routes);
app.use(Sentry.Handlers.errorHandler());

app.use(validationErrorsHandler());
app.use(errorsHandler);

export default app;
