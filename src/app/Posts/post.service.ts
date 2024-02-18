import { Post } from "./app-model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
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
        .pipe(map((postsData) => {

          return postsData.posts.map(Post => {
            return {
              Title : Post.Title,
              Content : Post.Content,
              id : Post.id
            }
          })
        }))
          .subscribe({
            next: (transformedPosts) => {
              this.posts = transformedPosts;
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
    this.http.post<{message : string}>('http://localhost:3000/api/posts', post)
    .subscribe(responseDta =>{
        console.log(responseDta.message);
        this.posts.push(post);
    this.postUpdated.next([...this.posts]);
    });
  } 
  deletePost(PostId:any){
    this.http.delete("http://localhost:3000/api/posts" + PostId).subscribe(() => {
      console.log('Deleted!');
    })
  }
}