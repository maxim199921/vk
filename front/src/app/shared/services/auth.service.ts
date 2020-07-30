import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SharedService} from './shared.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    public checkLogin = false;
    private url: string;


    constructor(private http: HttpClient, private router: Router, shared: SharedService) {
        if (localStorage.JWT_TOKEN && localStorage.REFRESH_TOKEN) {
            this.checkLogin = true;
        }
        this.url = environment.url;
    }

    loginUser(data: any): Observable<any> {
        return this.http.post<any>(`${this.url}/auth`, data)
            .pipe(
                tap( (data) => {
                    if (data) {
                        this.saveLocalstorage(data.returnTokens);
                        this.checkLogin = true;
                    } else {
                        this.checkLogin = false;
                        console.log('bad login and pass');
                    }
                }),
            );
    }

    saveLocalstorage(tokens): void {
        localStorage[this.JWT_TOKEN] = tokens.token;
        localStorage[this.REFRESH_TOKEN] = tokens.refreshToken;
    }

    isLoggedIn(): boolean {
        return this.checkLogin;
    }

    refreshTokens(token: any): Observable<any> {
        return this.http.post<any>(`${this.url}/refreshtoken`, {token})
            .pipe(
                tap(data => {
                    if (data) {
                        this.saveLocalstorage(data);
                        this.checkLogin = true;
                    } else {
                        this.checkLogin = false;
                        console.log('bad login and pass');
                    }
                })
            );
    }
}
