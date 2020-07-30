import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';



@Injectable()
export class SharedService {
  data: any ;
  viewProfie: any;
  posts: any;
  postsProfile: any;
  h: boolean;
  page = 1;

  private bool = new Subject<any>();
  private user =  new Subject<any>();
  private reload = new Subject<any>();
  private comment = new Subject<any>();
  private friend = new Subject<any>();
  reload$ = this.reload.asObservable();
  data$ = this.comment.asObservable();
  user$ = this.user.asObservable();
  friend$ = this.friend.asObservable();
  bool$ = this.bool.asObservable();





  loading(value) {

    this.bool.next(value);
  }

  scroll() {
    this.page += 1;

  }
  get getDataUser(): any {
    return this.data;
  }

  get profile(): any {
    return this.viewProfie;
  }

  transferUser(user: object) {
    this.data = user;
    this.user.next(user);
  }

  transferProfile(user: object) {
    this.viewProfie = user;
    this.user.next(user);
  }

  transferPost(post: any) {
    this.posts = post;
  }

  transferPostProfile(post: any) {
    this.postsProfile = post;
  }

  transferComment(comment: object) {
    this.posts.unshift(comment);
  }

  toggleCoommentsComponent(id: string) {
    this.comment.next(id);
  }

  addFriend(friend: any) {
    this.friend.next(friend);
  }



}
