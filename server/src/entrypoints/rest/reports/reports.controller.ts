import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('reports')
export class ReportsController {

  @Post()
  public create(): object {
    return { 'data': 'TODO: implement reports POST endpoint' };
  }

  @Get()
  public findAll(): object {
    return { 'data': 'TODO: implement reports GET endpoint' };
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return { 'data': 'TODO: implement reports GET:id endpoint', 'id': id };
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return { 'data': 'TODO: implement reports PUT:id endpoint', 'id': id};
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return { 'data': 'TODO: implement reports DELETE:id endpoint', 'id': id};
  }
}
