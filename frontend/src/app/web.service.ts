import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class WebService {

    BASE_URL = 'http://localhost:3000/api';
    messages;

    constructor(private httpClient: HttpClient, private sb : MatSnackBar) {
        this.getMessages();
    }

    async getMessages() {
        try {
            var response = await this.httpClient.get(this.BASE_URL + '/messages').toPromise();
            this.messages = response;
        } catch (error) {
           this.handleError("Unable to get messages from server.");
        } 
    }

    async postMessage(message){    
        try {
            var response = await this.httpClient.post(this.BASE_URL + '/messages', message).toPromise();
            this.messages.push(response); 
        } catch (error) {
            this.handleError("Unable to submit messages to server.");
        }
    }

    private handleError(error){
        console.error(error); 
        this.sb.open(error, "close", {duration: 2000});
    }
}