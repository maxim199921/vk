import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import {UserPageComponent} from './user-page/user-page.component';
import {SettingComponent} from './setting/setting.component';
import {FriendsComponent} from './friends/friends.component';
import {SearchComponent} from './search/search.component';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {MessagesComponent} from './messages/messages.component';
import {GroupsComponent} from './groups/groups.component';
import {ChatComponent} from '../shared/staticComponent/chat/chat.component';
import {GalleryComponent} from './gallery/gallery.component';




const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'myPage',
        component: UserPageComponent,
      },
      {
        path: 'settings',
        component: SettingComponent,
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'messages/:id',
        component: ChatComponent
      },
      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'friends',
        component: FriendsComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: ':id',
        component: ViewProfileComponent,
      },



    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
