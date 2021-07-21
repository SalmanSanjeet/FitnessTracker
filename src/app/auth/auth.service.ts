import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService{
    private user!: User ;
    authChange = new Subject<boolean>();

    constructor(private router: Router) {}
    // tslint:disable-next-line: typedef
    registeredUser(authdata: AuthData){
        this.user = {
            email: authdata.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully();
    }

    // tslint:disable-next-line: typedef
    login(authdata: AuthData){
        this.user = {
            email: authdata.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully();
    }

    logout(): void{
        this.user = {userId: '', email: ''};
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser(): User{
        return { ...this.user };
    }


    isAuth(): boolean{
        console.log(this.user);
        return !!this.user;
    }

    private authSuccessfully(): void{
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
