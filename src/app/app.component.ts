import { Component, OnInit } from '@angular/core';
import { Authservice } from './Auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor (private authService:Authservice){}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}  


