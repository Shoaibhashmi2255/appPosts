import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Authservice } from "./auth.service";

import { Observable } from "rxjs";
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor (private authService : Authservice){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authToken = this.authService.getToken();
        const authRequest = req.clone({
            headers : req.headers.set('authorization', 'Bearer ' + authToken)
        });
         return next.handle(authRequest);
    }
}