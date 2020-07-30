import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostsService} from '../../../services/posts.service';
import {SharedService} from '../../../../shared/services/shared.service';

@Component({
  selector: 'profile-posts',
  templateUrl: './profile.posts.component.html',
  styleUrls: ['./profile.posts.component.scss']
})
export class ProfilePostsComponent implements OnInit {
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


}
