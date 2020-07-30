import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class PostsService {

  private url: string;

  constructor(private http: HttpClient) {
      this.url = environment.url;
  }


  getAllPostsForUser(data): Observable<any> {
    return this.http.get(`${this.url}/allPost/${data.id}/${data.page}`);
  }
  postPhoto(data): Observable<any> {
    return this.http
      .post(`${this.url}/post/avatar`, data) as Observable<any>;
  }

  createPost(data: object): Observable<any> {
    return this.http.post(`${this.url}/post` , data);
  }

  addLike(idPost, idUser): Observable<any> {
    return this.http.put(`${this.url}/post/like` , {_id: idPost , likes : idUser});
  }
  addComment(idComment , content): Observable<any> {
    return this.http.put(`${this.url}/post/comment` , {_id : idComment , comments : content});
  }

  deleteLike(idPost, idUser) {
    const httpOptions = {
      params : new HttpParams().set('_id', idPost).set('likes', idUser)
    };
    return this.http.delete(`${this.url}/post/like` , httpOptions);
  }

  deletePost(idPost) {
    return this.http.delete(`${this.url}/post/${idPost}`);
  }

  deleteComment(idPost , idComment) {
    const httpOptions = {
      params : new HttpParams().set('_id', idPost, ).set('id_comment', idComment)
    };
    return this.http.delete(`${this.url}/post/comment` , httpOptions);
  }


}
