import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SharedService} from '../../../../shared/services/shared.service';
import {PostsService} from '../../../services/posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input('commentsArray') commentsArray;
  @Input() postId;

  user = {
    firstName : '',
    lastName : '',
    _id: '',
    comment: '',
    avatarPhoto: ''
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
    this.comments = this.commentsArray;
    this.user = this.share.getDataUser;
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
      id_user_comment : this.user._id,
      comment : content.innerText,
      lastName : this.user.lastName,
      firstName : this.user.firstName,
      avatarPhoto : this.user.avatarPhoto
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
