import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  authToken: any;

  constructor(private http: Http) { }

  getPosts(){
    return this.http.get('posts/')
           .map(res => res.json());
  }

  addPost(post){
    let headers = new Headers();
    this.storeToken()
    headers.append('Authorization', this.authToken);
    return this.http.post('posts/', post, {headers: headers})
           .map(res => res.json());
  }

  editPost(post, id){
    let headers = new Headers();
    this.storeToken()
    headers.append('Authorization', this.authToken);
    return this.http.put('posts/' + id, post, {headers: headers})
           .map(res => res.json());
  }

  deletePost(id){
    let headers = new Headers();
    this.storeToken()
    headers.append('Authorization', this.authToken);
    return this.http.delete('posts/' + id, {headers: headers})
           .map(res => res.json());
  }

  getSinglePost(id){
    let headers = new Headers();
    this.storeToken()
    headers.append('Authorization', this.authToken);
    return this.http.get('posts/' + id, {headers: headers})
           .map(res => res.json());
  }

  storeToken(){
    this.authToken = localStorage.getItem('token');
  }
}
