import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {SharedService} from '../services/shared.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {


    constructor(private router: Router, private loading: SharedService) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loading.loading(true);


        return next.handle(request).pipe(
            tap(res => {
                if (res instanceof HttpResponse) {
                    this.loading.loading(false);
                }
            }),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    this.loading.loading(false);
                }
                return throwError(err);
            })
        );

    }
}



