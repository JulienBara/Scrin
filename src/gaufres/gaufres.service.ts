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

  async findOne(username: string): Promise<Gaufre | undefined> {
    const querySpec = {
      query: 'SELECT * FROM Gaufres g WHERE g.username = @username',
      parameters: [
        {
          name: '@username',
          value: username,
        },
      ],
    };

    const { resources: gaufres } = await this.devicesContainer.items
      .query<Gaufre>(querySpec)
      .fetchAll();

    return gaufres.length >= 1 ? gaufres[0] : undefined;
  }

  async fetchTodaysGaufres() {
    const today = new Date();
    today.setUTCHours(0, 0, 0);

    const querySpec = {
      query: 'SELECT * FROM Gaufres g WHERE g.lastHeartbeat > @today',
      parameters: [
        {
          name: '@today',
          value: today.toISOString(),
        },
      ],
    };

    const { resources: gaufres } = await this.devicesContainer.items
      .query<Gaufre>(querySpec)
      .fetchAll();

    return gaufres;
  }

  async updateGaufre(gaufre: Gaufre): Promise<void> {
    await this.devicesContainer
      .item(gaufre.id, gaufre.id)
      .replace<Gaufre>(gaufre);
  }

  async heartbeatGaufre(deviceAddress: string): Promise<void> {
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
