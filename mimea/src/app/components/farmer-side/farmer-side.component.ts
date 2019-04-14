import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogOverviewExampleDialog} from './Dialog-component/dialog-overview-example-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-farmer-side',
  templateUrl: './farmer-side.component.html',
  styleUrls: ['./farmer-side.component.scss']
})
export class FarmerSideComponent {
  panelOpenState = false;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}