import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('/healthz')
export class TestController {
  constructor(private testService: TestService) {}
  @Get('')
  test() {
    return this.testService.health();
  }
}
