import { Component, OnInit } from '@angular/core';
import { Shipment } from '../../../types/Shipment';

const materialData: Shipment[] = [
  {id: 'shipment_9137', fromLocation: 'Groningen, location_2', toLocation: 'Groningen, location_2', cargo: [{name: 'Plastic (ABS)', weight: 5}, {name: 'Copper', weight: 2}]},
  {id: 'shipment_47', fromLocation: 'Groningen, location_201', toLocation: 'Groningen, location_52', cargo: [{name: 'Cotton', weight: 7}, {name: 'Aluminum', weight: 2}]},
  {id: 'shipment_183', fromLocation: 'Groningen, location_2', toLocation: 'Groningen, location_2', cargo: [{name: 'Plastic (ABS)', weight: 5}, {name: 'Copper', weight: 2}]},
  {id: 'shipment_238', fromLocation: 'Groningen, location_201', toLocation: 'Groningen, location_52', cargo: [{name: 'Cotton', weight: 7}, {name: 'Aluminum', weight: 2}]}
];

@Component({
  selector: 'app-transit',
  templateUrl: './transit.component.html',
  styleUrls: ['./transit.component.scss']
})
export class TransitComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['id', 'fromLocation', 'toLocation', 'cargo'];
  dataSource = materialData;

  ngOnInit() {
  }

}
