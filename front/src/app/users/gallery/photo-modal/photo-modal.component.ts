import { Component, Inject , OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {DataSourceService} from '../../services/data.source.service';
export interface DialogData {
  content: string;
}
@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})

export class PhotoModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PhotoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: DataSourceService
  ) { }

  ngOnInit() {
  }



  onNoClick(event): void {
    this.dialogRef.close();
  }
  onSave(data1) {

    this.dialogRef.close(data1);

  }

}
