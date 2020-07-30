import { Component, OnInit } from '@angular/core';
import {DataSourceService} from './services/data.source.service';
import {SharedService} from '../shared/services/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {}

}
