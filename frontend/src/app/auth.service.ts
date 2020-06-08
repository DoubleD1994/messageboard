import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:3000/auth';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token';

    constructor(private http: HttpClient, private router: Router){    }

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuthenticated(){
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    register(user){
        delete user.confirmPassword;
        this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
            var authResponse = res;
            if(!(authResponse as any).token){
                return;
            }
            localStorage.setItem(this.TOKEN_KEY, (authResponse as any).token);
            localStorage.setItem(this.NAME_KEY, (authResponse as any).firstName);
            this.router.navigate(['/']);
        });
    }

    logout(){
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }

}