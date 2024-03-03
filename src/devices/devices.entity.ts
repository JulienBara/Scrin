import { CosmosDateTime, CosmosPartitionKey } from '@nestjs/azure-database';

@CosmosPartitionKey('id')
export class Device {
  // the address
  id: string;
  name: string;
  @CosmosDateTime() lastHeartbeat: Date;
}
