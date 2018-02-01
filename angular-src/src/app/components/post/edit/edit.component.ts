import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  post: any;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.postService.getSinglePost(params['id']).subscribe(data => {
        this.post = data.post;
      });
    });
  }

  editPost(event){
    const editedPost = {
      title: this.post.title,
      content: this.post.content
    };
    this.postService.editPost(editedPost, this.post._id).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show("Edited post with success", { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/posts']);
      } else {
        this._flashMessagesService.show("Sorry, something went wrong", { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/posts/edit' + this.post._id]);
      }
    });
  }
}
