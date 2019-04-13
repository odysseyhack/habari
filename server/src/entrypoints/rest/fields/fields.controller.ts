import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('fields')
export class FieldsController {

  @Post()
  public create(): object {
    return { 'data': 'TODO: implement fields POST endpoint' };
  }

  @Get()
  public findAll(): object {
    return { 'data': 'TODO: implement fields GET endpoint' };
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return { 'data': 'TODO: implement fields GET:id endpoint', 'id': id };
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return { 'data': 'TODO: implement fields PUT:id endpoint', 'id': id};
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return { 'data': 'TODO: implement fields DELETE:id endpoint', 'id': id};
  }
}
