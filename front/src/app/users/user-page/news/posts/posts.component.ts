import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostsService} from '../../../services/posts.service';
import {SharedService} from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input('posts') posts: any;
  @Input('post') post: object;



  constructor(private postsService: PostsService , private shared: SharedService) { }

  ngOnInit() {
  }
  addLike(idPost: string, likes) {
  this.postsService.addLike(idPost, localStorage.getItem('userId')).subscribe(res => {
      if (!res.n) {
        this.postsService.deleteLike(idPost, localStorage.getItem('userId')).subscribe(res => {});
        if (likes.innerText <= 0) {
         return;
        }
        likes.innerText--;
        return ;
      }
      likes.innerText++;
    });
  }
  trigger(id: string) {
      this.shared.toggleCoommentsComponent(id);
  }
  deletePost(postId: string) {
    this.postsService.deletePost(postId).subscribe(res => {
      const id = this.posts.findIndex(post => {
           return post._id === postId;
         });
      this.posts.splice(id , 1);

    });


  }


}
