import { Controller, Get } from '@nestjs/common';
import { GaufresService } from './gaufres.service';

@Controller('gaufres')
export class GaufresController {
  constructor(private readonly gaufresService: GaufresService) {}

  @Get()
  async fetchGaufres() {
    const gaufres = await this.gaufresService.fetchTodaysGaufres();

    return gaufres.map((gaufre) => ({
      id: gaufre.id,
      name: gaufre.name,
    }));
  }
}
