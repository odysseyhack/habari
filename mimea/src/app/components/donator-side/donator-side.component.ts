import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import { AddMaterialsComponent } from './add-materials/add-materials.component';
import { Material } from '../../types/Material';

// >>>>>>> yo dawg, i heard u liked tables, so I put a table in your table, so you can table while you table

const materialData: Material[] = [
  {name: 'Plastic (ABS)', weight: 1.0079, status: 'Ready for pickup'},
  {name: 'Copper', weight: 4.0026, status: 'Ready for pickup'},
  {name: 'Cotton', weight: 6.941, status: 'Pickup in 1 hour'},
  {name: 'Aluminum', weight: 9.0122, status: 'Ready for pickup'}
];

@Component({
  selector: 'app-donator-side',
  templateUrl: './donator-side.component.html',
  styleUrls: ['./donator-side.component.scss']
})
export class DonatorSideComponent {

  displayedColumns: string[] = ['name', 'weight', 'status'];
  dataSource = materialData;
  constructor(public dialog: MatDialog) {}

  openMaterials(): void {
    const dialogRef = this.dialog.open(AddMaterialsComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
