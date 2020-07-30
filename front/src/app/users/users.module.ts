import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {FormsModule} from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';
import { NewsComponent } from './user-page/news/news.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import {MaterialModule} from '../material/material.module';
import { SettingComponent } from './setting/setting.component';
import { FriendsComponent } from './friends/friends.component';
import { CommentsComponent } from './user-page/news/comments/comments.component';
import { PostsComponent } from './user-page/news/posts/posts.component';
import { AllFriendsComponent } from './friends/all-friends/all-friends.component';
import { ApplicationComponent } from './friends/application/application.component';
import { ModalDeleteFriendComponent } from './friends/modal-delete-friend/modal-delete-friend.component';
import { SearchComponent } from './search/search.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import {ProfileCommentsComponent} from './view-profile/news/comments/profile.comments.component';
import {ProfileNewsComponent} from './view-profile/news/profile.news.component';
import {ProfilePostsComponent} from './view-profile/news/posts/profile.posts.component';
import {MessagesComponent} from './messages/messages.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupCardComponent } from './groups/group-card/group-card.component';
import {SharedModule} from '../shared/shared.module';
import { AddToGroupComponent } from './add-to-group/add-to-group.component';
import { AddToFriendModalComponent } from './add-to-group/add-to-friend-modal/add-to-friend-modal.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { GalleryComponent } from './gallery/gallery.component';
import {NgxGalleryModule} from 'ngx-gallery';
import { PhotoModalComponent } from './gallery/photo-modal/photo-modal.component';

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    UserPageComponent,
    NewsComponent,
    ModalWindowComponent,
    SettingComponent,
    CommentsComponent,
    PostsComponent,
    SettingComponent,
    FriendsComponent,
    AllFriendsComponent,
    ApplicationComponent,
    ModalDeleteFriendComponent,
    SearchComponent,
    ViewProfileComponent,
    ProfileCommentsComponent,
    ProfileNewsComponent,
    ProfilePostsComponent,
    MessagesComponent,
    GroupsComponent,
    GroupCardComponent,
    AddToGroupComponent,
    AddToFriendModalComponent,
    GalleryComponent,
    PhotoModalComponent
  ],
  entryComponents: [ModalWindowComponent, ModalDeleteFriendComponent, AddToFriendModalComponent,PhotoModalComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    InfiniteScrollModule,
    NgxGalleryModule
  ]
})
export class UsersModule { }
