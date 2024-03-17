import { Component, OnInit } from "@angular/core";
import { Post } from "../app-model";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostService } from "../post.service";
// import { mimeType } from "./mime-type.validator";
import { log } from "node:console";
@Component ({
    selector : 'CreatePostComponent',
    templateUrl : 'create-posts.component.html',
    styleUrls : ['create-post.css']
})

export class CreatePostComponent implements OnInit{
    // enteredValue= '';
    // post = '';
    form : FormGroup | any;

    PostTitle= '';
    PostContent = '';
    post : Post | any ;
    isLoading = false;
    mode = 'edit';
    postId:string | any ;
    imagePreview : string |any;
    // PostCreated = new EventEmitter<Post>();
    constructor (public postService:PostService, public route : ActivatedRoute){}

    ngOnInit(): void {
        this.form = new FormGroup({
            Title : new FormControl(null, {validators : [Validators.required , Validators.minLength(3)]}),
            Content : new FormControl (null, {validators: [Validators.required]}),
            image : new FormControl(null , {validators : [], asyncValidators:[]})
        })
        this.route.paramMap.subscribe((paramMap:ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postService.getPosts(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {id : postData._id, title : postData.Title, content : postData.Content, imagePath : postData.imagePath};
                    this.form.setValue({Title : this.post.title , Content : this.post.content, image : this.post.imagePath});
                });
                
            }else{
                this.mode = 'create';
                this.postId = null;
            }
        });
    };


    onImagePicked(event:Event){
        const File : any = (event.target as HTMLInputElement).files?.[0];
        this.form.patchValue({image: File});
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        }
        reader.readAsDataURL(File);        
    }
    onSavePost(){
        if(this.form.invalid){
            return;
        }
        
        this.isLoading = true;
        if (this.mode === 'create') {
         this.postService.addPost(this.form.value._id,this.form.value.Title, this.form.value.Content, this.form.value.image);
        }else{
            this.postService.upDatepost(this.postId,this.form.value.Title, this.form.value.Content, this.form.value.image);
        }this.isLoading = false;
        this.form.reset();
    }
}


