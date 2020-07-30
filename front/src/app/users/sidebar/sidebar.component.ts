import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import {MatDialog} from '@angular/material';
import {ModalWindowComponent} from '../modal-window/modal-window.component';
import {PostsService} from '../services/posts.service';
import {DataSourceService} from '../services/data.source.service';
import {Router , ActivatedRoute , ParamMap} from '@angular/router';
import {AddToFriendModalComponent} from '../add-to-group/add-to-friend-modal/add-to-friend-modal.component';
import {ChatService} from '../../shared/services/chat.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,OnDestroy {
  user: any = {
    id: ''
  };
  newFriend: any;
  photo = '';
  post = {
    id_user : '',
    content : '',
    date: new Date(),
    postPhoto: '',
    avatarPhoto: '',
    firstName : '',
    lastName : '',


  };
  private subscription: Subscription = new Subscription();
  isFriend = true;
  addtoFriend =  false;
  selectedFile = null;
  countMessage = 0;
  countNewFriends = 0;

  constructor(private shared: SharedService ,
              public dialog: MatDialog , private postsService: PostsService ,
              private userService: DataSourceService,
              private router: Router,
              private chatService: ChatService
  ) {}

  ngOnInit() {
      const photo = JSON.parse(localStorage.userData);
      this.photo = photo.avatarPhoto;
      this.subscription.add(this.shared.user$.subscribe(res => {
       this.newFriend = res;
       if (res.isFriend) {
         this.isFriend = false;
       }
       if (res._id !== localStorage.getItem('userId')) {
         this.addtoFriend = true;
         this.photo = res.avatarPhoto;
       } else {
         this.userService.initUser().subscribe((result) => {
           this.countNewFriends = result[0].applicationToAddFriend.length;
           this.addtoFriend = false;
           this.photo = result[0].avatarPhoto;
         });
       }

     }));
      this.chatService.listenMessages()
      .subscribe(data => {
          const userData = JSON.parse(localStorage.userData);
          userData.privateChannels.forEach(item => {
            if (item === data.room_id) {
              if (data.author !== localStorage.userId) {
                this.countMessage += 1;
              }
            }
          });

        }
      );
  }


  onUpload(event) {
    this.selectedFile = event.target.files[0];
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.userService.uploadAvatar(fd, localStorage.getItem('userId')).subscribe(result => {
        const userData = JSON.parse(localStorage.userData);
        userData.avatarPhoto = result;
        localStorage.userData = JSON.stringify(userData);
        this.photo = result;
    });
  }


    openDialog(): void {
    this.post.id_user = localStorage.getItem('userId');
    const userData = JSON.parse(localStorage.userData);
    this.post.firstName = userData.firstName;
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      width: '800px',
      data: { id: this.post.id_user,
        content: this.post.content,
        firstName : this.post.firstName,
        date : this.post.date,
        postPhoto: this.post.postPhoto,
        }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // if (!result) {
      //   return;
      // } else {

      this.post.content = result.content;
      this.post.postPhoto = result.postPhoto;
      this.postsService.createPost(this.post).subscribe((res) => {
        const userData =  JSON.parse(localStorage.getItem('userData'));
        res.user = {
          avatarPhoto: userData.avatarPhoto,
          firstName : userData.firstName,
          lastName : userData.lastName
        };

        this.shared.transferComment(res);
        this.resetPost();
        });

      // }

    });

  }
  createGroup(): void {
    const friendsArray = JSON.parse(localStorage.getItem('userData'));
    this.userService.getFriendsByArray({allFriends: friendsArray.friends}).subscribe(friends => {
      const dialogRef = this.dialog.open(AddToFriendModalComponent, {
        width: '600px',
        data: {friends:friends }
      });
      dialogRef.afterClosed().subscribe(result => {
      });

    });
  }
  addFriend() {
    this.userService.addApplicationToAddFriend(
      {_id: this.newFriend._id , applicationToAddFriend: localStorage.getItem('userId')}).subscribe(res => {
        console.log(res);
    });

  }

  resetPost() {
    this.post = {
      id_user: '',
      content: '',
      avatarPhoto: '',
      postPhoto: '',
      firstName : '',
      lastName : '',
      date: new Date(),
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
