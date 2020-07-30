import { Component, OnInit } from '@angular/core';
import {AddToFriendModalComponent} from '../add-to-group/add-to-friend-modal/add-to-friend-modal.component';
import {MatDialog} from '@angular/material';
import {PhotoModalComponent} from './photo-modal/photo-modal.component';
import {DataSourceService} from '../services/data.source.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  images = [];
  photo: any;
  selectedFile = null;
  constructor( public dialog: MatDialog , private userService: DataSourceService) { }


  ngOnInit() {
    this.userService.getOneDataById(localStorage.getItem('userId')).subscribe(user => {
      this.images = user[0].photo.reverse();
    });
  }

  onUpload(event) {
    this.selectedFile = event.target.files[0];
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.userService.addPhoto(fd, localStorage.getItem('userId')).subscribe(url => {
        this.images.unshift(url);
    });
  }
  removeImage(image) {
    const data = {
      image,
      id: localStorage.getItem('userId')
    };
    event.stopPropagation();
    this.userService.removePhoto(data).subscribe(result => {
      const id = this.images.findIndex(item => {
        return item === image;
      });
      this.images.splice(id, 1);
    });

  }
  openPhoto(photo): void {
    const dialogRef = this.dialog.open(PhotoModalComponent, {
        panelClass: 'photoModal',
        width: '600px',
        data: {hello: photo}
      });
    dialogRef.afterClosed().subscribe(result => {
      });


  }

}
