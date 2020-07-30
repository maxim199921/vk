import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {PostsService} from '../../services/posts.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @Input() piceOfNews;

  constructor(private shared: SharedService, private  postsService: PostsService,) {
  }

  ngOnInit() {

  }


}

