import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Authservice } from "../Auth/auth.service";
@Component ({
    selector : 'HeaderComponent',
    templateUrl : 'header.html',
    styleUrls : ['header.component.css']

})

export class headerComponent implements OnInit , OnDestroy{
    userIsAuthenticated = false;
    private authListenerSubs:Subscription | any;
    constructor (private authService:Authservice){}

    ngOnInit(): void {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
    };


    onLogOut(){
        this.authService.logOut();
    }
    ngOnDestroy(): void {
        this.authListenerSubs.unsubscribe();
    };
}
