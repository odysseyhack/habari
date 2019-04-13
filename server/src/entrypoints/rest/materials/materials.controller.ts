import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('materials')
export class MaterialsController {

  @Post()
  public create(): object {
    return { 'data': 'TODO: implement materials POST endpoint' };
  }

  @Get()
  public findAll(): object {
    return { 'data': 'TODO: implement materials GET endpoint' };
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return { 'data': 'TODO: implement materials GET:id endpoint', 'id': id };
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return { 'data': 'TODO: implement materials PUT:id endpoint', 'id': id};
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return { 'data': 'TODO: implement materials DELETE:id endpoint', 'id': id};
  }
}
