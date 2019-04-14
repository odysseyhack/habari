import { Component, OnInit } from '@angular/core';

export interface Material {
  name: string;
  weight: number;
  symbol: string;
}

const materialData: Material[] = [
  {name: 'Plastic (ABS)', weight: 1.0079, symbol: 'Ready for pickup'},
  {name: 'Copper', weight: 4.0026, symbol: 'Ready for pickup'},
  {name: 'Cotton', weight: 6.941, symbol: 'Pickup in 1 hour'},
  {name: 'Aluminum', weight: 9.0122, symbol: 'Ready for pickup'}
];

@Component({
  selector: 'app-donator-side',
  templateUrl: './donator-side.component.html',
  styleUrls: ['./donator-side.component.scss']
})
export class DonatorSideComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource = materialData;
  ngOnInit() {
  }

}
