import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostList } from './Posts/Post-lists/post-list.component';
import { CreatePostComponent } from './Posts/Create-Posts/create-posts.component';

const routes: Routes = [
  {path:'create', component : PostList},
  {path:'' , component : CreatePostComponent},
  {path:'edit/:postId' , component : CreatePostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
