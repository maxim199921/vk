import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../modal-window/modal-window.component';

@Component({
  selector: 'app-modal-delete-friend',
  templateUrl: './modal-delete-friend.component.html',
  styleUrls: ['./modal-delete-friend.component.scss']
})
export class ModalDeleteFriendComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDeleteFriendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
