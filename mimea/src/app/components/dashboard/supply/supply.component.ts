import { Component, OnInit } from '@angular/core';
import { Material } from '../../../types/Material';

const materialData: Material[] = [
  {name: 'Plastic (ABS)', weight: 1.0079, status: 'Ready for pickup', location: 'Groningen, location_2'},
  {name: 'Copper', weight: 4.0026, status: 'Ready for pickup', location: 'Groningen, location_4'},
  {name: 'Cotton', weight: 6.941, status: 'Pickup in 1 hour', location: 'Groningen, location_201'},
  {name: 'Aluminum', weight: 9.0122, status: 'Ready for pickup', location: 'Groningen, location_52'}
];

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss']
})
export class SupplyComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['name', 'weight', 'status', 'location'];
  dataSource = materialData;

  ngOnInit() {
  }

}
