import { Component, OnInit } from "@angular/core";
import { Post } from "../app-model";
import { PostService } from "../post.service";
@Component ({
    selector : 'postListComponent',
    templateUrl : 'post-list.component.html',
    styleUrls : ['post-list-component.css']
})

export class PostList implements OnInit{
  posts:Post[] =[];

  constructor (public postService:PostService){}
  ngOnInit(): void {
    this.posts = this.postService.getPost();
  }
}