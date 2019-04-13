import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('blueprint')
export class BlueprintController {

  @Post()
  public create(): object {
    return { 'data': 'TODO: implement blueprint POST endpoint' };
  }

  @Get()
  public findAll(): object {
    return { 'data': 'TODO: implement blueprint GET endpoint' };
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return { 'data': 'TODO: implement blueprint GET:id endpoint', 'id': id };
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return { 'data': 'TODO: implement blueprint PUT:id endpoint', 'id': id};
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return { 'data': 'TODO: implement blueprint DELETE:id endpoint', 'id': id};
  }
}
