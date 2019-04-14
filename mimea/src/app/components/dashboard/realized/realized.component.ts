import { Component, OnInit } from '@angular/core';
import { Shipment } from '../../../types/Shipment';

const realizedDate: any = [
  {location: 'field_12947', solutionType: 'habari_1274#A3', area: '1400 m2', status: 'live'},
  {location: 'field_1237', solutionType: 'habari_12374#A1', area: '100 m2', status: 'live'},
  {location: 'field_647', solutionType: 'cropper_374#A4', area: '190 m2', status: 'broken'},
  {location: 'field_127', solutionType: 'habari_1274#F1', area: '2400 m2', status: 'live'}
];

@Component({
  selector: 'app-realized',
  templateUrl: './realized.component.html',
  styleUrls: ['./realized.component.scss']
})
export class RealizedComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['location', 'solutionType', 'area', 'status'];
  dataSource = realizedDate;

  ngOnInit() {
  }

}
