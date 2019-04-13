import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BlueprintService } from '../../../entities/services/blueprint/blueprint.service';

@Controller('blueprint')
export class BlueprintController {
  constructor(private blueprintService: BlueprintService) { }

  @Post()
  public create(): object {
    return this.blueprintService.create();
  }

  @Get()
  public findAll(): object {
    return this.blueprintService.findAll();
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return this.blueprintService.findById(id);
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return this.blueprintService.update(id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return this.blueprintService.remove(id);
  }
}
