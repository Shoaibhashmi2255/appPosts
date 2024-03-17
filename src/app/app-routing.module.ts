import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostList } from './Posts/Post-lists/post-list.component';
import { CreatePostComponent } from './Posts/Create-Posts/create-posts.component';
import { LoginComponent } from './Auth/logIn/login.component';
import { SignUpComponent } from './Auth/signUp/signup.component';

const routes: Routes = [
  {path:'create', component : PostList},
  {path:'' , component : CreatePostComponent},
  {path:'edit/:postId' , component : CreatePostComponent},
  {path: 'login' , component : LoginComponent},
  {path: 'signup' , component : SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
