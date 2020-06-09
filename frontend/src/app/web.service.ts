import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class WebService {

    BASE_URL = 'http://localhost:3000/api';

    private messageStore;

    private messageSubject = new Subject();

    messages = this.messageSubject.asObservable();

    constructor(private httpClient: HttpClient, private sb : MatSnackBar, private auth: AuthService) {
        this.getMessages('');
    }

    getMessages(user) {
        user = (user) ? '/' + user : '';
        this.httpClient.get(this.BASE_URL + '/messages' + user).subscribe(response => {
            this.messageStore = response;
            this.messageSubject.next(this.messageStore);
        }, error => {
            this.handleError("Unable to get messages from server.");
        });     
    }

    async postMessage(message){    
        try {
            var response = await this.httpClient.post(this.BASE_URL + '/messages', message).toPromise();
            this.messageStore.push(response); 
            this.messageSubject.next(this.messageStore);
        } catch (error) {
            this.handleError("Unable to submit messages to server.");
        }
    }

    getUser() {
        return this.httpClient.get(this.BASE_URL + '/users/me', {headers: this.auth.tokenHeader});
    }

    saveUser(userData) {
        return this.httpClient.post(this.BASE_URL + '/users/me', userData, {headers: this.auth.tokenHeader});
    }

    private handleError(error){
        console.error(error); 
        this.sb.open(error, "close", {duration: 2000});
    }
}