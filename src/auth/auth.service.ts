import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GaufresService } from '../gaufres/gaufres.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private gaufresService: GaufresService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user: any = await this.gaufresService.findOne(username);
    if (!(await bcrypt.compare(pass, user.hash))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: 'x', username: 'y' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
