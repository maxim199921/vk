import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ConversationService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }

    getAllConversation(): Observable<any> {
        return this.http
            .get(`${this.url}/conversation`) as Observable<any>;
    }

    getConversationByArray(conversation: any): Observable<any> {
        return this.http
            .post(`${this.url}/conversation/getAll`, conversation);
    }

    getConversationByArrayAndUserId(data: any): Observable<any> {
        return this.http
            .post(`${this.url}/conversation/getAllByUserId`, data);
    }

    updateMessages(data: any): Observable<any> {
        return this.http
            .put(`${this.url}/conversation/messages`, data) as Observable<any>;
    }

    createGroupConversation(conversation: any): Observable<any> {
        return this.http
            .post(`${this.url}/conversation/createGroup`, conversation);
    }
}
