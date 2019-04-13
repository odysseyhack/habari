import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FieldService } from '../../../entities/services/field/field.service';

@Controller('fields')
export class FieldsController {
  constructor(private fieldsService: FieldService) { }

  @Post()
  public create(): object {
    return this.fieldsService.create();
  }

  @Get()
  public findAll(): object {
    return this.fieldsService.findAll();
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return this.fieldsService.findById(id);
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return this.fieldsService.update(id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return this.fieldsService.remove(id);
  }
}
