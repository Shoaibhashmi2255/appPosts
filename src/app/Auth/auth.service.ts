import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { response } from "express";
import { Subject } from "rxjs";

@Injectable({providedIn : 'root'})
export class Authservice{
    private IsAuthenticated = false;
    private token : string | any;
    private tokenTimer :  any;
    private authStatusListener = new Subject<boolean>();
    constructor (private http: HttpClient, private router : Router){}

    getToken(){
        return this.token;
    };
    getIsAuth () {
        return this.IsAuthenticated;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }
    
    createUser(email : any, password : string){
        const authData : AuthData = {email:email, password:password};
        
        this.http.post('http://localhost:3000/api/user/signup', authData).subscribe(response => {
            console.log(response);
        });
    };
    logInUser(email:any, password:string){
        const authData : AuthData = {email:email, password:password};
        console.log(authData);
        
        this.http.post<{token : string, expiresIn : number}>('http://localhost:3000/api/user/login', authData).subscribe(response => {
            console.log(response);
            const token = response.token;
            this.token = token;
            if (token) {
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                
                this.IsAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationdate = new Date(now.getTime() + expiresInDuration * 1000);
                console.log(expirationdate);
                
                this.saveAuthData(token, expirationdate);
                this.router.navigate(['/']);
            };
            
        });
    };

    // getAuthUser () {
    //     const authInformation = this.getAuthData();
    //     const now = new Date();
    //     const expiresIn = authInformation?.expirationDate.getTime() - now.getTime();
    //     if (expiresIn > 0) {
    //         this.token = authInformation?.token;
    //         this.IsAuthenticated = true;
    //         this.setAuthTimer(expiresIn);
    //         this.authStatusListener.next(true);
    //     }

    // }

    // autoAuthUser() {
    //     const authInformation = this.getAuthData();
    //     if (authInformation && authInformation.expirationDate) {
    //         const now = new Date();
    //         const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    //         if (expiresIn > 0) {
    //             this.token = authInformation.token;
    //             this.IsAuthenticated = true;
    //             this.setAuthTimer(expiresIn/1000);
    //             this.authStatusListener.next(true);
    //         };
    //     };
    // };

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.IsAuthenticated = true;
            this.setAuthTimer(expiresIn/1000);
            this.authStatusListener.next(true);
        };

    };

   logOut(){
    this.token = null;
    this.IsAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
   };

   private setAuthTimer (duration : number){
    console.log("setting auth timer : " + duration);
    
    this.tokenTimer =   setTimeout(() => {
        this.logOut();
    }, duration * 1000)
   }

   private saveAuthData (token : string, expirationDate : Date){
    try {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    } catch (error:any) {
        console.error('Error setting localStorage items:', error.message);
    }

   };

   private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
   };

   private getAuthData () {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
        return;
    }
    return {
        token : token,
        expirationDate : new Date(expirationDate)
    }
   }
};
