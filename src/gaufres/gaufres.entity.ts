import { CosmosDateTime, CosmosPartitionKey } from '@nestjs/azure-database';

@CosmosPartitionKey('id')
export class Gaufre {
  id: string;
  name: string;
  deviceAddress: string;
  @CosmosDateTime() lastHeartbeat: Date;
}
