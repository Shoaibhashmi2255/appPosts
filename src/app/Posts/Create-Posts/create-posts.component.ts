import { Component, OnInit } from "@angular/core";
import { Post } from "../app-model";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostService } from "../post.service";

@Component ({
    selector : 'CreatePostComponent',
    templateUrl : 'create-posts.component.html',
    styleUrls : ['create-post.css']
})

export class CreatePostComponent implements OnInit{
    // enteredValue= '';
    // post = '';
    PostTitle= '';
    PostContent = '';
    private mode = 'edit';
    private postId:string | null | undefined ;
    private post : Post | undefined;
    // PostCreated = new EventEmitter<Post>();
    constructor (public postService:PostService, public route : ActivatedRoute){}

    ngOnInit(): void {
        this.route.paramMap.subscribe((paramMap:ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.post = this.postService.getPosts(this.postId);
            }else{
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    PostCreate(form:NgForm){
        if(form.invalid){
            return;
        }        
    this.postService.addPost(form.value.Title, form.value.Content);
    }
    
}