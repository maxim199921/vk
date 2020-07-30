import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {DataSourceService} from '../../services/data.source.service';
import {Data, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ModalDeleteFriendComponent} from '../modal-delete-friend/modal-delete-friend.component';
import {ConversationService} from '../../services/conversation.service';
import {Subscription} from 'rxjs/index';

@Component({
    selector: 'app-all-friends',
    templateUrl: './all-friends.component.html',
    styleUrls: ['./all-friends.component.scss']
})
export class AllFriendsComponent implements OnInit, OnDestroy {
    public friends: any;
    private subscription: Subscription = new Subscription();
    @Output('friendsLength')
    public friendsLength = new EventEmitter<number>();
    @Output('deleteFriendsLength')
    public deleteFriends = new EventEmitter<number>();
    private page = 1;
    public friendsId: any[] = [];

    constructor(private shared: SharedService,
                private dataSource: DataSourceService,
                private router: Router,
                public dialog: MatDialog,
                private userService: DataSourceService,
                private conversation: ConversationService) {
    }

    ngOnInit() {
        this.subscription.add(this.dataSource.initUser().subscribe((result) => {
            this.shared.transferUser(result[0]);
            this.friendsId = result[0].friends;
            this.dataSource.getFriendsByArray(
                {allFriends: result[0].friends, page: this.page}
            ).subscribe((friendsData) => {
                this.friends = friendsData;
                this.setFriendsLength(result[0].friends.length);
            });
        }));
        this.triggerAddFriend();
    }
    doRequest() {
      this.page += 1;
      this.subscription.add(this.userService.getFriendsByArray({
          allFriends: this.friendsId,
          page: this.page
        }
      ).subscribe(res => {
        res.forEach(item => {
          this.friends.push(item);
        });
      }));
    }
    filterFuncFriends(friendId: string): any {
        this.friends = this.friends.filter((item) => {
            if (item._id !== friendId) {
                return item;
            }
        });
    }
    toProfile(id) {
        this.router.navigate([`main/${id}`]);
    }

    setFriendsLength(number: number): void {
        this.friendsLength.emit(number);
    }

    deleteFriendsLength(number: number): void {
        this.deleteFriends.emit(number);
    }

    triggerAddFriend() {
        this.subscription.add(this.shared.friend$.subscribe(res => {
            this.friends.push(res);
        }));
    }

    openDialog(friendId: string): void {
        const dialogRef = this.dialog.open(ModalDeleteFriendComponent, {
            width: '250px',
        });
        this.subscription.add(dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.deleteFriends(localStorage.userId, friendId).subscribe(result => {
                    this.filterFuncFriends(friendId);
                    this.deleteFriendsLength(1);
                });
            }
        }));
    }

    entryToRoom(user: string): void {
        this.subscription.add(this.dataSource.getOneDataById(localStorage.userId).subscribe(dataUser => {
                this.conversation.getConversationByArrayAndUserId(
                    {
                        allConversation: dataUser[0],
                        id_user: user
                    }
                ).subscribe(res => {
                    this.router.navigate([`main/messages/${res._id}`]);
                });
            }
        ));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
