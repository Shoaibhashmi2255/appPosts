import { Component, EventEmitter, Output } from "@angular/core";



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
    @Output() PostCreated = new EventEmitter();
    PostCreate(){
        // console.log('Entered Value:', this.enteredValue);
    // console.log('Post:', this.post);
        // this.post = this.enteredValue;
        // alert('Hit by me Mommy')
        const post = {
            Title : this.PostTitle,
            Content : this.PostContent
        }
        this.PostCreated.emit(post);
    }
}