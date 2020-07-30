import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataSourceService} from '../services/data.source.service';
import {ConversationService} from '../services/conversation.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {
  conversations: any[] = [];
  private page: number = 1;
  public publicChannelsId: any[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private dataSource: DataSourceService,
              private conversation: ConversationService) { }

  ngOnInit() {
    this.dataSource.getOneDataById(localStorage.userId).subscribe(result => {
        this.publicChannelsId = result[0].publicChannels;
        this.conversation.getConversationByArray({
          allConversation: result[0].publicChannels,
          page: this.page
        }
        ).subscribe(res => {
          this.conversations = res;
        });
      }
    );
  }

  onScroll() {
    this.page += 1;
    this.subscription.add(this.conversation.getConversationByArray({
        allConversation: this.publicChannelsId,
        page: this.page
      }
    ).subscribe(res => {
      res.forEach(item => {
        this.conversations.push(item);
      });
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
