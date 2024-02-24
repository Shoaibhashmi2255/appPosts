import { Post } from "./app-model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { error } from "node:console";
@Injectable({
    providedIn: 'root',
}) 
export class PostService implements OnInit {
    private posts:Post[] = [];
    private postUpdated = new Subject <any>();
    constructor (private http:HttpClient) {}
    ngOnInit(): void {
      this.getPost();
    };
    getPost() {
        this.http.get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
        .pipe(map((postsData) => {
          return postsData.posts.map((Post : any) => {
            return {
              Title : Post.Title,
              Content : Post.Content,
              _id : Post._id
            };
          });
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
      };

    getUpdatePostListener(){
      return this.postUpdated.asObservable();
    };

    getPosts (id : string) {
      return {...this.posts.find( p => p._id === id)};
    }

    addPost(Title:string,Content:string){
    const post:Post = {_id:null , Title:Title, Content:Content};
    this.http.post<{message : string, PostId : string}>('http://localhost:3000/api/posts', post)
    .subscribe(responseDta =>{
        const Id = responseDta.PostId;
        post._id = Id;
        this.posts.push(post);
    this.postUpdated.next([...this.posts]);
    });
  };
  deletePost(PostId:any){
    console.log(PostId);
    this.http.delete("http://localhost:3000/api/posts/" + PostId).subscribe(() => {
      const updatedPost = this.posts.filter(post => post._id !== PostId);
      console.log(updatedPost);
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
    });
  };
};