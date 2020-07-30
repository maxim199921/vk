import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import {AllFriendsComponent} from './all-friends/all-friends.component';
import {ApplicationComponent} from './application/application.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  public friendsLength: number = 0;
  public applicationsLength: number = 0;
  @ViewChild('child')
  private child: AllFriendsComponent;
  @ViewChild('applicationChild')
  private applicationChild: ApplicationComponent;


  constructor(private shared: SharedService) {}

  ngOnInit() {}

  setFriendsLength(number:number):void {
    this.friendsLength = number;
  }
  onScroll() {
    this.child.doRequest();
    this.applicationChild.doRequest();
  }

  deleteFriendsLength(number:number):void {
    this.friendsLength -=  number;
  }

  setApplicationsLength(number:number):void {
    this.applicationsLength = number;
  }
  deleteApplicationsLength(number:number):void {
    if (number === 0) {
      this.applicationsLength -=  1;
    } else {
      this.applicationsLength -=  number;
      this.friendsLength +=  number;
    }
  }

}
