import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataSourceService} from '../services/data.source.service';
import {ConversationService} from '../services/conversation.service';
import {Router} from '@angular/router';
import {ChatService} from '../../shared/services/chat.service';
import {Subscription} from 'rxjs/index';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
    public privateGroup: any[] = [];
    private subscription: Subscription = new Subscription();
    private page: number = 1;
    public privateChannelsId: any[] = [];

    constructor(private chatService: ChatService,
                private dataSource: DataSourceService,
                private conversation: ConversationService,
                private router: Router) {
    }

    ngOnInit() {
        this.subscription.add(this.dataSource.getOneDataById(localStorage.userId).subscribe(result => {
            this.privateChannelsId = result[0].privateChannels;
            this.subscription.add(this.conversation.getConversationByArray({
                allConversation: result[0].privateChannels,
                page: this.page
            }
                ).subscribe(res => {
                    this.privateGroup = res;
                }));
            }
        ));
        this.chatService.listenMessages()
            .subscribe(data => {
                this.privateGroup = this.privateGroup.map(item => {
                  if (item._id === data.room_id) {
                    item.__v = item.__v + 1;
                    return item;
                  }
                  return item;
                })
            }
        );
    }

  onScroll() {
    this.page += 1;
    this.subscription.add(this.conversation.getConversationByArray({
        allConversation: this.privateChannelsId,
        page: this.page
      }
    ).subscribe(res => {
      res.forEach(item => {
        this.privateGroup.push(item);
      });
    }));
  }

    getCounter(idRoom) {
      let count :number;
      this.privateGroup.forEach(item => {
        if (item._id === idRoom) {
          count = item.__v;
        }
      });
      if (count !== 0) {
        return count;
      }
    }

    toProfile(id) {
        this.router.navigate([`main/${id}`]);
    }

    toRoom(id) {
      this.subscription.add(this.dataSource.getOneDataById(localStorage.userId).subscribe(dataUser => {
          this.subscription.add(this.dataSource.getOneDataById(id).subscribe(dataFriend => {
              this.subscription.add(this.conversation.getConversationByArrayAndUserId(
                {
                  allConversation: dataUser[0],
                  id_user: dataFriend[0]
                }
              ).subscribe(res => {
                this.router.navigate([`main/messages/${res._id}`]);
              }));
            }
          ));
        }
      ));
    }

    filterUser(members: any) {
        return members.filter(item => item.id_user !== localStorage.userId)[0];
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
