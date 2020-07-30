import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent implements OnInit {

  @Input() conversation;
  constructor(private router: Router) {}

  ngOnInit() {

  }
  openChat() {
  this.router.navigate([`main/messages/${this.conversation._id}`]);

  }
}



