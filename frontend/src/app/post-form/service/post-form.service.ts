import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostFormService {
  constructor(private http: HttpClient) {}

  addPost(postContent: string, postImageUrl: string, authorName: any) {
    this.http
      .post<any>(environment.backendServer + '/api/posts', {
        authorName: authorName,
        message: postContent,
        imageUrl: postImageUrl,
        date: new Date(),
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
