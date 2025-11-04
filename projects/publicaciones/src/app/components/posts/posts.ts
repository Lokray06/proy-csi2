import { Component, inject } from '@angular/core';
import { Post } from '../../modelos/post';
import { PostService } from '../../servicios/post-service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-posts',
  imports: [FormsModule],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  posts: Post[] = [];
  newPost: Post = { title: '', body: '' };

  // version con singals:
  // posts = signal<Post[]>([]);
  // newPost = signal<Post>({ title: '', body: '' });

  private postService = inject(PostService);

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data.slice(0, 10); // cargar solo los primeros 10 posts
      // this.posts.set(data.slice(0, 10)); // version con signals
      console.log('Posts cargados:', this.posts);
    });
    console.log('Posts cargados antes del observable: ', this.posts.length);
  }

  addPost(): void {
    this.postService.createPost(this.newPost).subscribe((createdPost: Post) => {
      this.posts.unshift(createdPost);
      this.newPost = { title: '', body: '' };
    });
  }
}
