import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../modelos/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';

  private http = inject(HttpClient);


  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post);
  }
  
}
