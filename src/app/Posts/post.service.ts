import { Post } from "./app-model";
export class PostService {
    private posts:Post[] = [];

    getPost(){
        return this.posts;
    }

    addPost(Title:string,Content:string){
    const post:Post = {Title:Title, Content:Content};
    this.posts.push(post);
    }
}