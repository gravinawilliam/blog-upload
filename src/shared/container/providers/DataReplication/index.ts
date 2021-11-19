import { container } from 'tsyringe';
import DataReplication from './implementations/DataReplicationProvider';
import { IDataReplicationProvider } from './models/IDataReplicationProvider';

container.registerSingleton<IDataReplicationProvider>(
  'DataReplication',
  DataReplication,
);
