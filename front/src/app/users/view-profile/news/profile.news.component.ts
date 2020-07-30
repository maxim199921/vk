import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {PostsService} from '../../services/posts.service';


@Component({
  selector: 'profile-news',
  templateUrl: './profile.news.component.html',
  styleUrls: ['./profile.news.component.scss']
})
export class ProfileNewsComponent implements OnInit {
  @Input() piceOfNews;
  @Input() profileUser;

  constructor(private shared: SharedService, private  postsService: PostsService,) {
  }

  ngOnInit() {

  }


}

