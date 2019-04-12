import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('shipments')
export class ShipmentsController {

  @Post()
  public create(): object {
    return { 'data': 'TODO: implement shipments POST endpoint' };
  }

  @Get()
  public findAll(): object {
    return { 'data': 'TODO: implement shipments GET endpoint' };
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return { 'data': 'TODO: implement shipments GET:id endpoint', 'id': id };
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return { 'data': 'TODO: implement shipments PUT:id endpoint', 'id': id};
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return { 'data': 'TODO: implement shipments DELETE:id endpoint', 'id': id};
  }
}
