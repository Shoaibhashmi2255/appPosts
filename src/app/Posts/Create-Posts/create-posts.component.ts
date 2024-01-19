import { Component } from "@angular/core";



@Component ({
    selector : 'CreatePostComponent',
    templateUrl : 'create-posts.component.html',
    styleUrls : ['create-post.css']
})

export class CreatePostComponent {
    enteredValue= '';
    post = 'Hello';
    PostCreate(){
        // console.log('Entered Value:', this.enteredValue);
    this.post = this.enteredValue;
    // console.log('Post:', this.post);
        // this.post = this.enteredValue;
        // alert('Hit by me Mommy')
    }
}