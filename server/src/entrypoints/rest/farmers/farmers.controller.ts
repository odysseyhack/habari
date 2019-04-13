import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DonorInterface } from '../../../entities/interfaces/donor.interface';
import { FarmerUsecases } from '../../../usecases/farmer.usecases';

@Controller('farmers')
export class FarmersController {
  public constructor(private farmerUsecases: FarmerUsecases) {}

  @Post()
  public create(@Body() donor: DonorInterface): any {
    return this.farmerUsecases.createFarmer(donor);
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
