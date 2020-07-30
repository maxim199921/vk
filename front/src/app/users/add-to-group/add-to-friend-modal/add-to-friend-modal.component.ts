import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataSourceService} from '../../services/data.source.service';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {ConversationService} from '../../services/conversation.service';
import {Router} from '@angular/router';
export interface DialogData {
  content: string;
}
@Component({
  selector: 'app-add-to-friend-modal',
  templateUrl: './add-to-friend-modal.component.html',
  styleUrls: ['./add-to-friend-modal.component.scss']
})

export class AddToFriendModalComponent implements OnInit {
  form: FormGroup;
  friends: any;
  name: string;

  constructor(private userService: DataSourceService , private router: Router,
              private conversation: ConversationService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddToFriendModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, ) {

    this.form = this.fb.group({
        friends :  new FormArray([] , this.minSelectedCheckboxes(2)),
        name: ''
    });
  }

  ngOnInit() {
    this.friends = this.data['friends'];
    this.friends.map((friend, i) => {
      const control = new FormControl( );
      (this.form.controls.friends as FormArray).push(control);
    });

  }
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

  submit(form) {
    const members = [...form.friends].map((selected, index) => {
      return {
        id: this.friends[index]._id,
        selected
      };
    });
    const selectedMembers =  members.filter(item => {
      return item.selected ;
    });
    const arrayId = selectedMembers.map(item => {
      return item.id;
    });
    arrayId.push(localStorage.getItem('userId'));
    const data = {
      arrayId,
      name: form.name
    };
    this.conversation.createGroupConversation( data).subscribe(id => {
        this.router.navigate([`main/messages/${id}`]);
     });




  }

  onNoClick(event): void {
    this.dialogRef.close();
  }
  onSave(data1) {

    this.dialogRef.close(data1);

  }

}
