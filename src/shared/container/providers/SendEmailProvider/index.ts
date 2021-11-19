import { container } from 'tsyringe';
import SendEmailProvider from './implementations/SendEmailProvider';
import { ISendEmailProvider } from './models/ISendEmailProvider';

container.registerSingleton<ISendEmailProvider>(
  'SendEmailProvider',
  SendEmailProvider,
);
