import { Component, OnInit } from '@angular/core';
import {DataSourceService} from '../services/data.source.service';

@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.scss']
})
export class AddToGroupComponent implements OnInit {

  constructor(private UserService : DataSourceService) { }

  ngOnInit() {


  }

}
