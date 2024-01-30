import { Post } from "./app-model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { error } from "node:console";
@Injectable({
    providedIn: 'root',
}) 
export class PostService {
    private posts:Post[] = [];
    private postUpdated = new Subject <Post[]>();
    constructor (private http:HttpClient) {}
    getPost() {
        this.http.get<{ message: string; posts: Post[] }>('http://localhost:3000/api/posts')
          .subscribe({
            next: (postsData) => {
              this.posts = postsData.posts;
              this.postUpdated.next([...this.posts]);
            },
            error: (err) => {
              console.error(err);
            },
          });
      }

    getUpdatePostListener(){
        return this.postUpdated.asObservable();
    }

    addPost(Title:string,Content:string){
    const post:Post = {id:null , Title:Title, Content:Content};
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
    }
    
}