import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostList } from './Posts/Post-lists/post-list.component';
import { CreatePostComponent } from './Posts/Create-Posts/create-posts.component';
import { LoginComponent } from './Auth/logIn/login.component';
import { SignUpComponent } from './Auth/signUp/signup.component';
import { authGuard } from './Auth/auth.guard';

const routes: Routes = [
  {path:'', component : PostList,},
  {path:'create' , component : CreatePostComponent,  canActivate:[authGuard]},
  {path:'edit/:postId' , component : CreatePostComponent,canActivate:[authGuard]},
  {path: 'login' , component : LoginComponent},
  {path: 'signup' , component : SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
