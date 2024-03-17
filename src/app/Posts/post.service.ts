import { Post } from "./app-model";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { error } from "node:console";
import { response } from "express";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
@Injectable({
    providedIn: 'root',
})  
export class PostService implements OnInit {
    private posts:Post[] = [];
    private postUpdated = new Subject <{posts : Post[], postCount : number}>();
    constructor (private http:HttpClient, private router:Router) {}
    ngOnInit() {
      // this.getPost();
    };
    getPost(postsPerPage : number , currentPage : number) {
      const querryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
        this.http.get<{ message: string; posts: any; maxPosts : number }>('http://localhost:3000/api/posts' + querryParams)
        .pipe(map((postsData) => {
          return { posts : postsData.posts.map((Post : any) => {
            return {
              Title : Post.Title,
              Content : Post.Content,
              _id : Post._id,
              imagePath : Post.imagePath
            };
          }), maxPosts : postsData.maxPosts};
        }))
          .subscribe({
            next: (transformedPostData) => {
              this.posts = transformedPostData.posts;
              this.postUpdated.next({posts : [...this.posts], postCount : transformedPostData.maxPosts});
            },
            error: (err) => {
              console.error(err);
            },
          });
      };

    getUpdatePostListener(){
      return this.postUpdated.asObservable();
    };

    getPosts (_id : any) {
      return this.http.get<{_id:any , Title : string, Content : string, imagePath : string}>("http://localhost:3000/api/posts/" + _id);
    }

    addPost(_id:string, Title:string,Content:string, image:File){
    const PostData = new FormData();
    PostData.append('_id' , _id)
    PostData.append('Title' , Title);
    PostData.append('Content' , Content);
    PostData.append('image' , image , Title);
    this.http.post<{message : string, post : Post}>('http://localhost:3000/api/posts', PostData)
    .subscribe(responseDta =>{
      
    //   const post : Post = {_id : responseDta.post._id, Title:Title , Content:Content, imagePath: responseDta.post.imagePath}
    //   console.log(post._id);
    //   this.posts.push(post);
    // this.postUpdated.next([...this.posts]);
    // console.log(this.posts);
    this.router.navigate(["/create"]);
    });
  };
  
  upDatepost (_id:any, title:string, content:string, image : File | any){
    let PostData : Post | FormData;
      if (typeof (image) === 'object') {
        PostData = new FormData();
        PostData.append('_id' , _id)
        PostData.append('Title', title);
        PostData.append('Content' , content);
        PostData.append('image' , image, title);

      }else{
        PostData  = {
          _id:_id,
          Title : Title,
          Content : content,
          imagePath : image
        }
      }
      this.http.put("http://localhost:3000/api/posts/" + _id, PostData).subscribe(response=> {
      // const updatedPosts = [...this.posts];
      // const oldPostIndex = updatedPosts.findIndex(p => p._id === _id);
      // const post :Post = {
      //   _id:_id,
      //   Title : Title,
      //   Content : content,
      //   imagePath : image
      // }
      // updatedPosts[oldPostIndex] = post;
      // this.posts = updatedPosts;
      // this.postUpdated.next([...this.posts]);
      this.router.navigate(["/create"]);
    });
  };

  deletePost(PostId:string){
    console.log(PostId);
    return this.http.delete("http://localhost:3000/api/posts/" + PostId);
  };
};