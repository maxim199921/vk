import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';



@Injectable()
export class DataSourceService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }
    checkEmail(value): Observable<any>  {
      console.log(value)
      return this.http.post(`${this.url}/checkEmail`, {email: value});
    }
    uploadAvatar(data, id): Observable<any> {
        return this.http
            .post(`${this.url}/uploadAvatars/${id}`, data) as Observable<any>;
    }
    addPhoto(data, id): Observable<any> {
    return this.http
      .post(`${this.url}/uploadPhoto/${id}`, data) as Observable<any>;
  }
  removePhoto(data): Observable<any> {
      return this.http
      .put(`${this.url}/user/removePhoto`, data) as Observable<any>;
  }

    getData(): Observable<any> {
        return this.http
            .get(`${this.url}/user`) as Observable<any>;
    }

    initUser(): Observable<any> {
        const token = localStorage.getItem('REFRESH_TOKEN');
        return this.http.post(`${this.url}/initUser`, {token}).pipe(
            catchError((err) => {
                if (err) {
                    // console.log(err)
                }
                return throwError(err);
            })
        );

    }

    getOneDataById(id: string): Observable<any> {
        return this.http
            .get(`${this.url}/user/${id}`) as Observable<any>;
    }

    setNewData(data: any): Observable<any> {
        return this.http
            .post(`${this.url}/user`, data) as Observable<any>;
    }

    updateData(data: any): Observable<any> {
        return this.http
            .put(`${this.url}/user`, data) as Observable<any>;
    }

    getFilter(data: any): Observable<any> {
        return this.http
            .put(`${this.url}/user/filter`, data) as Observable<any>;
    }

    deleteData(id: string): Observable<any> {
        return this.http
            .delete(`${this.url}/user/${id}`) as Observable<any>;
    }

    registrUser(data: any) {
        return this.http
            .post(`${this.url}/registration`, data) as Observable<any>;
    }

    getFriendsByArray(friends: any) {
        return this.http
            .post(`${this.url}/user/friends`, friends) as Observable<any>;
    }

    addfriends(friends: any) {
        return this.http
            .put(`${this.url}/user/friends`, friends) as Observable<any>;
    }

    deleteFriends(_id, friends) {
        const httpOptions = {
            params: new HttpParams().set('_id', _id).set('friends', friends)
        };
        return this.http.delete(`${this.url}/user/friends`, httpOptions);
    }

    getApplicationToAddFriendByArray(applicationToAddFriend: any) {
        return this.http
            .post(`http://localhost:3000/user/applicationToAddFriend`, applicationToAddFriend
            ) as Observable<any>;
    }

    addApplicationToAddFriend(applicationToAddFriend: any) {
        return this.http
            .put(`${this.url}/user/applicationToAddFriend`, applicationToAddFriend) as Observable<any>;
    }

    deleteApplicationToAddFriend(_id: string, applicationToAddFriend: any) {
        const httpOptions = {
            params: new HttpParams().set('_id', _id).set('applicationToAddFriend', applicationToAddFriend)
        };
        return this.http.delete(`${this.url}/user/applicationToAddFriend`, httpOptions);
    }


}
