import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../app-model";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";
@Component ({
    selector : 'postListComponent',
    templateUrl : 'post-list.component.html',
    styleUrls : ['post-list-component.css']
})
export class PostList implements OnInit, OnDestroy{
  posts:Post[] =[];
  private postsSub : Subscription = new Subscription;
  constructor (public postService:PostService){}
  ngOnInit() {
    this.postService.getPost();
    this.postsSub = this.postService.getUpdatePostListener().subscribe((posts:Post[]) => {
      this.posts = posts;
    });
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}