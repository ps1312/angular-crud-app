import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ValidationService } from '../../services/validation.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any;
  user: any;
  title: String;
  content: String;
  reloadingPosts: Boolean;

  constructor(private postService: PostService,
              private validationService: ValidationService){ }

  ngOnInit() {
    this.getPosts();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.reloadingPosts = false;
  }

  getPosts(){
    this.reloadingPosts = true;
    setTimeout(() => {
      this.reloadingPosts = false;
    }, 2000);
    this.postService.getPosts().subscribe(data => {
      this.posts = data.posts;
    });
  }

  addPost(){
    const newPost = {
      title: this.title,
      content: this.content,
      username: this.user.username
    };

    this.postService.addPost(newPost).subscribe(data => {
      this.getPosts();
    });
  }

  deletePost(id){
    this.postService.deletePost(id).subscribe(data => {
      console.log(data);
      this.getPosts();
    })
  }

}
