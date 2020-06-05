import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {

    BASE_URL = 'http://localhost:3000/api';

    constructor(private httpClient: HttpClient) {}

    getMessages() {
        return this.httpClient.get(this.BASE_URL + '/messages').toPromise();
    }

    postMessage(message){
        return this.httpClient.post(this.BASE_URL + '/messages', message, {responseType: 'text'}).toPromise();
    }
}