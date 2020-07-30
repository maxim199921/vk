import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err) => {
            if (err.status === 401 || err.message === 'Unauthorized access.') {
                const refreshToken = localStorage.REFRESH_TOKEN;
                return this.authService.refreshTokens(refreshToken).pipe(
                    switchMap((res) => {
                        return next.handle(
                            request = request.clone({
                                setHeaders: {
                                    authorization: res.token
                                }
                            })
                        );
                    })
                );
            }
            if (err.status === 403 || err.status === 402 || err.status === 500) {

                localStorage.removeItem('JWT_TOKEN');
                localStorage.removeItem('REFRESH_TOKEN');
                this.authService.checkLogin = false;
                this.router.navigate(['']);
            }
            return throwError(err);
        }));
    }

}
