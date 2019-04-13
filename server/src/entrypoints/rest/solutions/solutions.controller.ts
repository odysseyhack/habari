import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('solutions')
export class SolutionsController {

  @Post()
  public create(): object {
    return { 'data': 'TODO: implement solutions POST endpoint' };
  }

  @Get()
  public findAll(): object {
    return { 'data': 'TODO: implement solutions GET endpoint' };
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return { 'data': 'TODO: implement solutions GET:id endpoint', 'id': id };
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return { 'data': 'TODO: implement solutions PUT:id endpoint', 'id': id};
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return { 'data': 'TODO: implement solutions DELETE:id endpoint', 'id': id};
  }
}
