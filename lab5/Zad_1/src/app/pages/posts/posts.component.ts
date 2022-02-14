import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { JsonPlaceholderService } from 'src/app/services/json-placeholder.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  url: String = "https://jsonplaceholder.typicode.com/posts";
  posts: Post[] = [];
  
  userId: number | undefined;
  title:String | undefined;
  body:String | undefined;

  constructor(
    private jsonPlaceholderService: JsonPlaceholderService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.jsonPlaceholderService.getPosts()
    .subscribe((posts) =>{
      this.posts = posts;
    });
  }

  postData() {
    let post: Post = {
      userId: this.userId,
      title: this.title,
      body: this.body
    }
    this.jsonPlaceholderService.addPost(post)
    .subscribe(data => {
      console.log("Nowy post: ", data);
      alert("Dodano nowy post: sprawdź console.log");
    });
  }

}
