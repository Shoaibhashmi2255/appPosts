import { Component } from "@angular/core";
import { Post } from "../app-model";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";

@Component ({
    selector : 'CreatePostComponent',
    templateUrl : 'create-posts.component.html',
    styleUrls : ['create-post.css']
})

export class CreatePostComponent {
    // enteredValue= '';
    // post = '';
    PostTitle= '';
    PostContent = '';
    // PostCreated = new EventEmitter<Post>();
    PostCreate(form:NgForm){
        if(form.invalid){
            return;
        }
        // console.log('Entered Value:', this.enteredValue);
    // console.log('Post:', this.post);
        // this.post = this.enteredValue;
        // alert('Hit by me Mommy')
    this.postService.addPost(form.value.Title, form.value.Content);
    }
    constructor (public postService:PostService){}
}