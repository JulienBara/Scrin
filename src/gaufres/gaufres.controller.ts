import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { GaufresService } from './gaufres.service';
import { Public } from '../auth';
import * as bcrypt from 'bcrypt';

@Controller('gaufres')
export class GaufresController {
  constructor(private readonly gaufresService: GaufresService) {}

  @Get()
  @Public()
  async fetchGaufres() {
    const gaufres = await this.gaufresService.fetchTodaysGaufres();

    return gaufres.map((gaufre) => ({
      id: gaufre.id,
      name: gaufre.name,
    }));
  }

  @Post('changePassword')
  async changePassword(
    @Request() req,
    @Body() { password }: { password: string },
  ) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const gaufre = await this.gaufresService.findOne(req.user.username);
    await this.gaufresService.updateGaufre({
      ...gaufre,
      hash,
    });
  }
}
