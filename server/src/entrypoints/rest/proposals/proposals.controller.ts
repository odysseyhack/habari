import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('proposals')
export class ProposalsController {

  @Post()
  public create(): object {
    return { 'data': 'TODO: implement proposals POST endpoint' };
  }

  @Get()
  public findAll(): object {
    return { 'data': 'TODO: implement proposals GET endpoint' };
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return { 'data': 'TODO: implement proposals GET:id endpoint', 'id': id };
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return { 'data': 'TODO: implement proposals PUT:id endpoint', 'id': id};
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return { 'data': 'TODO: implement proposals DELETE:id endpoint', 'id': id};
  }
}
