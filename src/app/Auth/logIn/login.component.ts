import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Authservice } from "../auth.service";
@Component({
    templateUrl : 'login.component.html',
    styleUrls : ['login.component.css']
})

export class LoginComponent {
    isLoading = false;

    constructor (public authService : Authservice){}
    onLogIn(form : NgForm){
        if (form.invalid) {
            return;
        }
        this.authService.logInUser(form.value.email, form.value.password);
    };
};