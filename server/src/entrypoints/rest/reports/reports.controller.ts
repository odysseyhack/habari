import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReportService } from '../../../entities/services/report/report.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportService) { }

  @Post()
  public create(): object {
    return this.reportService.create();
  }

  @Get()
  public findAll(): object {
    return this.reportService.findAll();
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return this.reportService.findById(id);
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return this.reportService.update(id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return this.reportService.remove(id);
  }
}
