import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import {DataSourceService} from '../services/data.source.service';
import {PostsService} from '../services/posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  user: any = {
    firstName : '',
    lastName : '',
    email: '',
    age: ''

  };
  photo = '';
  private page = 1;
  posts = [];
  active = false;


  constructor(private userService: DataSourceService , private shared: SharedService , private postService: PostsService) { }

  ngOnInit() {
    this.userService.initUser().subscribe((result) => {

      const res = result[0];
      const data = JSON.stringify(res);
      localStorage.setItem('userId' , `${res._id}`);
      localStorage.setItem('userData' , data);
      this.user = res;
      this.photo = res.avatarPhoto;
      const data1 = {
        id: this.user._id,
        page: this.page
      };
      this.postService.getAllPostsForUser(data1).subscribe(result1 => {
        result1.reverse();
        this.shared.transferPost(result1);
        this.posts = this.shared.posts;

      });
      this.shared.transferUser(res);
    });


  }
  toggle() {
    this.active = !this.active;
  }

}
