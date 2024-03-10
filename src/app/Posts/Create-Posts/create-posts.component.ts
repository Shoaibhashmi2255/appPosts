import { Component, OnInit } from "@angular/core";
import { Post } from "../app-model";
import { FormControl, FormGroup, Validators} from "@angular/forms";
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
    post : Post | any ;
    isLoading = false;
    form : FormGroup | any;
     mode = 'edit';
     postId:string | any ;
    
    // PostCreated = new EventEmitter<Post>();
    constructor (public postService:PostService, public route : ActivatedRoute){}

    ngOnInit(): void {
        this.form = new FormGroup({
            Title : new FormControl(null, {validators : [Validators.required , Validators.minLength(3)]}),
            Content : new FormControl (null, {validators: [Validators.required]}),
            image : new FormControl(null , {validators : [Validators.required]})
        })
        this.route.paramMap.subscribe((paramMap:ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postService.getPosts(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {id : postData._id, title : postData.Title, content : postData.Content};
                    this.form.setValue({Title : this.post.title , Content : this.post.content});
                });
                
            }else{
                this.mode = 'create';
                this.postId = null;
            }
        });
    }


    onImagePicked(event:Event){
        const File = (event.target as HTMLInputElement)files[0];
        this.form.patchValue({image: File});
        this.form.get('image').updateValueAndValidity();
        console.log(File);
        console.log(this.form);
        
        
    }
    onSavePost(){
        if(this.form.invalid){
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
         this.postService.addPost(this.form.value.Title, this.form.value.Content);
        }else{
            this.postService.upDatepost(this.postId,this.form.value.Title, this.form.value.Content)
        }this.isLoading = false;
        this.form.reset();
    }
}


