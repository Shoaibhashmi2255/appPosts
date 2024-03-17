import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { CreatePostComponent } from "./Posts/Create-Posts/create-posts.component";
import { PostList } from "./Posts/Post-lists/post-list.component";
import { headerComponent } from "./Header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './Auth/logIn/login.component';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './Auth/signUp/signup.component';




@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    PostList,
    headerComponent,
    LoginComponent,
    SignUpComponent
  ],   
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule,
    

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
