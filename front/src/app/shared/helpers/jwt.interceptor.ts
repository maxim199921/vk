import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.JWT_TOKEN;
        if (token) {
            request = request.clone({
                setHeaders: {
                    authorization: `${token}`
                }
            });
        }

        return next.handle(request);
    }
}