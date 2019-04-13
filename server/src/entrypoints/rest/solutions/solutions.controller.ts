import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SolutionService } from '../../../entities/services/solution/solution.service';

@Controller('solutions')
export class SolutionsController {
  constructor(private solutionService: SolutionService) { }

  @Post()
  public create(): object {
    return this.solutionService.create();
  }

  @Get()
  public findAll(): object {
    return this.solutionService.findAll();
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return this.solutionService.findById(id);
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return this.solutionService.update(id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return this.solutionService.remove(id);
  }
}
