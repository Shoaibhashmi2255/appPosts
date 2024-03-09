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
  posts:any = [];
  isLoading = false;
  private postsSub : Subscription = new Subscription;
  constructor (public postService:PostService){}
  ngOnInit() {
    this.isLoading = true;
    this.postService.getPost();
    this.postsSub = this.postService.getUpdatePostListener().subscribe((posts:any) => {
      // console.log(posts);
      posts.forEach((element:any) => {
        this.isLoading = false;
        this.posts.push(element);
      });
      // this.posts = posts;
    });
    // console.log(this.posts);

  };
  onDelete(PostId:any) {
    this.postService.deletePost(PostId);
    console.log(this.posts);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
