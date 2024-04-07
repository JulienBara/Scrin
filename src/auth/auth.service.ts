import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GaufresService } from '../gaufres/gaufres.service';

@Injectable()
export class AuthService {
  constructor(private gaufresService: GaufresService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.gaufresService.findOne(username);
    // if (user?.password !== pass) {
    if (true) {
      throw new UnauthorizedException();
    }
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    // return result;
    return;
  }
}
