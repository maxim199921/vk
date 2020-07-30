import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataSourceService} from '../services/data.source.service';
import {PostsService} from '../services/posts.service';
import {Observable} from 'rxjs';


export interface DialogData {
  content: string;
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal-window.component.html',
})
export class ModalWindowComponent {

  selectedFile = null;
  photo: string;
  trololo:any;

  constructor( private postsService: PostsService,
               public dialogRef: MatDialogRef<ModalWindowComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) {
this.trololo = this.data;  }

  onNoClick(event): void {
      this.dialogRef.close();
  }
  onSave(data1) {

    this.dialogRef.close(data1);

  }
  onUpload(event) {
    this.selectedFile = event.target.files[0];
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.postsService.postPhoto(fd).subscribe(result => {
      this.photo = result.url;
      this.trololo.postPhoto = this.photo;
    });
  }


}
