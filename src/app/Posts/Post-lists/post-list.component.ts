import { Component,Input } from "@angular/core";

@Component ({
    selector : 'postListComponent',
    templateUrl : 'post-list.component.html',
    styleUrls : ['post-list-component.css']
})

export class PostList{
  @Input()  posts =[];
}