import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {DataSourceService} from '../../services/data.source.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/index';
import {AllFriendsComponent} from '../all-friends/all-friends.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnDestroy {

  private applications: any;
  private subscription: Subscription = new Subscription();
  @ViewChild('child')
  private child: AllFriendsComponent;
  private page = 1;
  public applicationsId: any[] = [];

  @Output('applicationsLength')
  public applicationsLength = new EventEmitter<number>();
  @Output('deleteApplication')
  public deleteApplication = new EventEmitter<number>();

  constructor(private shared: SharedService,
              private dataSource: DataSourceService,
              private router: Router) {}

  ngOnInit() {
      this.subscription.add(this.dataSource.initUser().subscribe((result) => {
        this.shared.transferUser(result[0]);
        this.applicationsId = result[0].applicationToAddFriend;
        this.subscription.add(this.dataSource.getApplicationToAddFriendByArray(
          {applicationToAddFriend: result[0].applicationToAddFriend}
        ).subscribe((applicationToAddFriend) => {
          this.applications = applicationToAddFriend;
          this.setApplicationLength( result[0].applicationToAddFriend.length);
        }));
    }));
  }

  filterFuncApplicationToAddFriend(applicationToAddFrienId: string): any {
    this.applications = this.applications.filter((item) => {
      if (item._id !== applicationToAddFrienId) {
        return item;
      }
    });
  }
  doRequest() {
    this.page += 1;
    this.subscription.add(this.dataSource.getFriendsByArray({
        allFriends: this.applicationsId,
        page: this.page
      }
    ).subscribe(res => {
      res.forEach(item => {
        this.applications.push(item);
      });
    }));
  }

  setApplicationLength(number: number): void {
    this.applicationsLength.emit(number);
  }
  deleteApplicationNumb(number: number): void {
    this.deleteApplication.emit(number);
  }

  addToFriend(friend): any {
    this.subscription.add(this.dataSource.addfriends({
      _id: localStorage.userId,
      friends: friend._id
    }).subscribe( result => {
      this.shared.addFriend(friend);
      this.deleteApplicationToAddFriend(friend);
      this.deleteApplicationNumb(1);
    }));
  }

  cancelFriend(friend): any {
    this.deleteApplicationToAddFriend(friend);
    this.deleteApplicationNumb(0);
  }

  deleteApplicationToAddFriend(friend): any {
    this.subscription.add(this.dataSource.deleteApplicationToAddFriend(localStorage.userId, friend._id)
      .subscribe(result => {
        this.filterFuncApplicationToAddFriend(friend._id);
      }));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
