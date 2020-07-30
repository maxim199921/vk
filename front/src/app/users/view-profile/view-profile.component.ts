import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import {DataSourceService} from '../services/data.source.service';
import {PostsService} from '../services/posts.service';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
@Component({
  selector: 'app-user-page',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit, OnDestroy {

  profile: any = {
    firstName : '',
    lastName : '',
    email: '',
    age: ''

  };
  posts = [];
  private page = 1;
  active = false;


  constructor(private userService: DataSourceService ,
              private shared: SharedService ,
              private postService: PostsService,
              private router: Router,
              private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activateRoute.snapshot.params.id;
    this.userService.getOneDataById(id).subscribe(res => {
      this.profile = res[0];
      const data1 = {
        id: this.profile._id,
        page: this.page
      };
      localStorage.setItem('currentUser', this.profile._id);
      this.shared.transferProfile(this.profile);
      this.postService.getAllPostsForUser(data1).subscribe(res => {
        this.posts = res;
        this.shared.transferPostProfile(res);

      });
    });

  }



  toggle() {
    this.active = !this.active;
  }

  ngOnDestroy(): void {
    localStorage.removeItem('flag');
  }

}
