import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
@Injectable({providedIn:'root'}) 

export class PostService {
 private  posts: Post[] =  [];
 private PostUpdated = new Subject<Post[]>();

  AddPost(title: string, content:string){
    const post: Post = {title: title, content: content};
    this.posts.push(post);

    this.PostUpdated.next([...this.posts]);
  }

  getPosts(){
    return [...this.posts];
  }
  getPostlistiener (){
    return this.PostUpdated.asObservable();
  }

}