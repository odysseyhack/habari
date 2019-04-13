import { Controller, Post } from '@nestjs/common';

@Controller('simulate')
export class SimulateController {

  @Post()
  public simulate(): object {
    return {'data': 'TODO: implement simulate POST endpoint' };
  }
}
