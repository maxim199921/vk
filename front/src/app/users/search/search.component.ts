import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../shared/services/shared.service';
import {DataSourceService} from '../services/data.source.service';
import {ConversationService} from '../services/conversation.service';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    public filterUsersData: any[] = [];
    public filterUsersDataCheck = false;
    private subscription: Subscription = new Subscription();
    private page = 1;
    private value: string;
    @ViewChild('scrollMe')
    public scrollMe: ElementRef;

    constructor(private route: ActivatedRoute,
                private shared: SharedService,
                private dataSource: DataSourceService,
                private router: Router,
                private conversation: ConversationService) {
    }

    ngOnInit() {
        this.subscription.add(this.route.paramMap
          .pipe(debounceTime(500))
          .subscribe(params => {
            const value = params.get('value');
            this.value = value;
            this.scrollMe.nativeElement.scrollTo(0, 0);
            if (value) {
                this.page = 1;
                this.filterUsersDataCheck = false;
                this.subscription.add(this.dataSource.getFilter(
                    {
                        _id: localStorage.userId,
                        value,
                        page: this.page
                      }
                    ).subscribe(result => {
                    this.filterUsersData = result;
                    if (result.length === 0) {
                        this.filterUsersDataCheck = true;
                    }
                }));
            } else {
                this.filterUsersDataCheck = true;
            }
        }));
    }

    onScroll() {
        this.page += 1;
        this.subscription.add(this.dataSource.getFilter(
          {
            _id: localStorage.userId,
            value: this.value,
            page: this.page
          }
        ).subscribe(result => {
          result.forEach(item => {
            this.filterUsersData.push(item);
          });
        }));
    }

    toProfile(id) {
        this.router.navigate([`main/${id}`]);
    }

    addApplication(user: any): void {
        this.subscription.add(this.dataSource.addApplicationToAddFriend(
            {
                _id: user._id,
                applicationToAddFriend: localStorage.userId,
            })
            .subscribe(result => {
                console.log(result);
            }));
    }

    entryToRoom(user: string): void {
        this.subscription.add(this.dataSource.getOneDataById(localStorage.userId).subscribe(dataUser => {
            this.subscription.add(this.conversation.getConversationByArrayAndUserId(
                    {
                        allConversation: dataUser[0],
                        id_user: user
                    }
                ).subscribe(res => {
                    this.router.navigate([`main/messages/${res._id}`]);
                }));
            }
        ));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
