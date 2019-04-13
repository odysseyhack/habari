import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MaterialService } from '../../../entities/services/material/material.service';

@Controller('materials')
export class MaterialsController {
  constructor(private  materialService: MaterialService) { }

  @Post()
  public create(): object {
    return this.materialService.create();
  }

  @Get()
  public findAll(): object {
    return this.materialService.findAll();
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return this.materialService.findById(id);
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return this.materialService.update(id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return this.materialService.remove(id);
  }
}
