import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShipmentService } from '../../../entities/services/shipment/shipment.service';

@Controller('shipments')
export class ShipmentsController {
  constructor(private shipmentService: ShipmentService) { }

  @Post()
  public create(): object {
    return this.shipmentService.create();
  }

  @Get()
  public findAll(): object {
    return this.shipmentService.findAll();
  }

  @Get(':id')
  public findById(@Param('id') id: string): object {
    return this.shipmentService.findById(id);
  }

  @Put(':id')
  public update(@Param('id') id: string): object {
    return this.shipmentService.update(id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): object {
    return this.shipmentService.remove(id);
  }
}
