import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SharedService} from '../../../../shared/services/shared.service';
import {PostsService} from '../../../services/posts.service';

@Component({
  selector: 'profile-comments',
  templateUrl: './profile.comments.component.html',
  styleUrls: ['./profile.comments.component.scss']
})
export class ProfileCommentsComponent implements OnInit {

  @Input('commentsArray') commentsArray;
  @Input() postId;
  @Input() profileUser;
  userAvatar : any;
  user = {
    firstName : '',
    lastName : '',
    _id: '',
    comment: '',
  };
  comment: any = {
    id_user_comment : '',
    comment : '',
    id: ' ',
  };
  comments  = [];
  hui: boolean;
  toggleComments: boolean;



  constructor(private share: SharedService , private postService: PostsService) {

  }


  ngOnInit() {
   const userAvatar = JSON.parse(localStorage.getItem('userData'));
   this.userAvatar = userAvatar.avatarPhoto;

    this.comments = this.commentsArray;
    const data = JSON.parse(localStorage.getItem('userData'));
    this.user = data
    if (!this.commentsArray.length) {
      this.toggleComments = true;
    }
   this.share.data$.subscribe(res => {
          this.toggleComm(res);
    });
  }

  toggleComm(id) {
    if (id === this.postId) {
   this.toggleComments = false;
    }
  }
  getCommentContent(content: any) {
    const comment  = content.innerText;
    if (!comment) {
      return;
    }
    this.comment = {
      id_user_comment : localStorage.getItem('userId'),
      comment : content.innerText,
      lastName : this.user.lastName,
      firstName : this.user.firstName,
      avatarPhoto : this.userAvatar
    };
    this.postService.addComment(this.postId , this.comment).subscribe(result => {
      console.log(result);
      content.innerText = '';
      // this.comment.id = result.comments[result.comments.length -1].
      this.comments.push(this.comment);
    });

  }
  showAllComments() {
    this.comments = this.commentsArray;
  }
  deleteComment(commentId: string ) {
    this.postService.deleteComment(this.postId , commentId).subscribe(res => {
     const id = this.comments.findIndex(post => {
       return post._id === commentId;
     });
     this.comments.splice(id , 1);

   });

  }
}
