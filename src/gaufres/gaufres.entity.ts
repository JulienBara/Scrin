import { CosmosDateTime, CosmosPartitionKey } from '@nestjs/azure-database';

@CosmosPartitionKey('id')
export class Gaufre {
  id: string;
  username: string;
  hash: string;
  name: string;
  deviceAddress: string;
  @CosmosDateTime() lastHeartbeat: Date;
}
