import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../models/image';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {
  private postsUrl = "https://jsonplaceholder.typicode.com/posts";
  private imgsUrl = "https://jsonplaceholder.typicode.com/photos";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applications/json'
    })
  }

  constructor(private http:HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.postsUrl)
  }

  getPhotos(): Observable<any> {
    return this.http.get<any>(this.imgsUrl);
  }

  getPhoto(id: number): Observable<Image> {
    const url =  `${this.imgsUrl}/${id}`;
    return this.http.get<Image>(url);
  }

  addPhoto(photo: Image): Observable<Image> {
    return this.http.post<Image>(this.imgsUrl, photo, this.httpOptions);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }
}
