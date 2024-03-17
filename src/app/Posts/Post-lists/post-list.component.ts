import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";

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
  totalPosts = 0;
  postsPerPage = 1;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1;
  private postsSub : Subscription = new Subscription;
  constructor (public postService:PostService){}
  ngOnInit() {
    this.isLoading = true;
    this.postService.getPost(this.postsPerPage , this.currentPage);
    this.postsSub = this.postService.getUpdatePostListener().subscribe((postData : {posts:Post[], postCount: number}) => {
      // console.log(posts);
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
      // this.posts = posts;
    });
    // console.log(this.posts);

  };

  onChangePage(pageDta : PageEvent){
    this.isLoading = true;
    this.currentPage = pageDta.pageIndex + 1;
    this.postsPerPage = pageDta.pageSize;
    this.postService.getPost(this.postsPerPage , this.currentPage);
    
  }
  onDelete(PostId:any) {
    this.isLoading = true;
    this.postService.deletePost(PostId).subscribe(() => {
      this.postService.getPost(this.postsPerPage, this.currentPage);
    });
    // this.postService.getUpdatePostListener().subscribe((post: any ) =>{
    //   this.posts = post;
    // })
    console.log(this.posts);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
