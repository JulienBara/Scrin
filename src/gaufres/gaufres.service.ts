import { InjectModel } from '@nestjs/azure-database';
import { Injectable } from '@nestjs/common';
import { Gaufre } from './gaufres.entity';
import type { Container } from '@azure/cosmos';

@Injectable()
export class GaufresService {
  constructor(
    @InjectModel(Gaufre)
    private readonly devicesContainer: Container,
  ) {}

  async heartbeatGaufre(deviceAddress): Promise<void> {
    const querySpec = {
      query: 'SELECT * FROM Gaufres g WHERE g.deviceAddress = @deviceAddress',
      parameters: [
        {
          name: '@deviceAddress',
          value: deviceAddress,
        },
      ],
    };

    const { resources: gaufres } = await this.devicesContainer.items
      .query<Gaufre>(querySpec)
      .fetchAll();

    if (gaufres.length === 0) {
      return;
    }

    await this.devicesContainer
      .item(gaufres[0].id, gaufres[0].id)
      .replace<Gaufre>({
        ...gaufres[0],
        lastHeartbeat: new Date(),
      });

    return;
  }
}
