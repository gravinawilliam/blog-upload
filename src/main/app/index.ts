import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';

// import '../config/typeorm.config';
import routes from '../routes';

const app = express();

app.use(express.json());
app.use(routes);

export default app;
