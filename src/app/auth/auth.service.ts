import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

export class AuthService{
    private user: User = {userId: '', email: ''};
    authChange = new Subject<boolean>();

    // tslint:disable-next-line: typedef
    registeredUser(authdata: AuthData){
        this.user = {
            email: authdata.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChange.next(true);
    }

    // tslint:disable-next-line: typedef
    login(authdata: AuthData){
        this.user = {
            email: authdata.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChange.next(true);
    }

    // tslint:disable-next-line: typedef
    logout(){
        this.user = {userId: '', email: ''};
        this.authChange.next(false);
    }
    // tslint:disable-next-line: typedef
    getUser(){
        return { ...this.user };
    }

    // tslint:disable-next-line: typedef
    isAuth(){
        return this.user.email === '' || this.user.userId === '';
    }
}
