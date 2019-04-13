import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProposalService } from '../../../entities/services/proposal/proposal.service';

@Controller('proposals')
export class ProposalsController {
  constructor(private proposalService: ProposalService) { }

  @Post()
  public create(): object {
    return this.proposalService.create();
  }

  @Get()
  public findAll(): object {
    return this.proposalService.findAll();
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return this.proposalService.findById(id);
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return this.proposalService.update(id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return this.proposalService.remove(id);
  }
}
