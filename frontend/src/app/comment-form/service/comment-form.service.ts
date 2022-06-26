import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentFormService {
  constructor(private http: HttpClient) {}

  addCommentToPost(idPost: string, authorName: any, text: string) {
    this.http
      .patch<any>(
        environment.backendServer + '/api/posts/comment-post/' + idPost,
        { authorName: authorName, text: text, creationDate: new Date() }
      )
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
