import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-materials',
  templateUrl: './add-materials.component.html',
  styleUrls: ['./add-materials.component.scss']
})
export class AddMaterialsComponent {
  material: string;
  quantity: string;
  status: string;

  constructor( public dialogRef: MatDialogRef<AddMaterialsComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
