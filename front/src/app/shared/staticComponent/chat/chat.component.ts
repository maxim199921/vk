import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {ConversationService} from '../../../users/services/conversation.service';
import {Subscription} from 'rxjs/index';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    messageArray = [];
    user: string;
    userData: any;
    room: string;
    messageText: string;
    private subscription: Subscription = new Subscription();

    constructor(private chatService: ChatService,
                private route: ActivatedRoute,
                private conversationService: ConversationService) {
    }

    ngOnInit() {
        this.room = this.route.snapshot.params.id;
        const dataUser = JSON.parse(localStorage['userData']);
        this.user = dataUser.firstName;
        this.userData = dataUser;
        this.subscription.add(this.conversationService.getConversationByArray({
            allConversation: [this.room]
        }).subscribe(data => {
          if (data.length !== 0){
            data[0].messages.forEach(item => {
              this.messageArray.push({
                firstName: item.user.firstName,
                lastName: item.user.lastName,
                avatarPhoto: item.user.avatarPhoto,
                message: item.body,
                date: item.date
              });
            });
          }
        }));
        this.chatService.newUserJoined()
            .subscribe(data => {
                console.log(data);
            });
        this.chatService.userLeftRoom()
            .subscribe(data => {
                console.log(data);
            });
        this.chatService.newMessageReceived()
            .subscribe(data => {
                this.messageArray.push(data);
                this.messageText = '';
            });
        this.chatService.joinRoom({user: this.user, room: this.room});
    }

    sendMessage() {
        if (!this.messageText) {
            return;
        }
        this.chatService.sendMessage({
            author: this.userData._id,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
            avatarPhoto: this.userData.avatarPhoto,
            room: this.room,
            message: this.messageText
        });
    }

    ngOnDestroy(): void {
        this.chatService.leaveRoom({user: this.user, room: this.room});
        this.subscription.unsubscribe();
    }

}
