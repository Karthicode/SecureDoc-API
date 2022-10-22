import { Injectable } from '@nestjs/common';
@Injectable()
export class TestService {
  health() {
    return { message: '200 OK' };
  }
}
