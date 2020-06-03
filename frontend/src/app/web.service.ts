import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {

    constructor(private httpClient: HttpClient) {}

    getMessages() {
        return this.httpClient.get('http://localhost:3000/api/messages').toPromise();
    }
}