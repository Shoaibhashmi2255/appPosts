import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
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
import { PostService } from './Posts/post.service';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    PostList,
    headerComponent

  ], 
  
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule

  ],
  providers: [
    PostService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
