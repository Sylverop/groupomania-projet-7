import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/signin/service/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  likePost(postId: string, userId: string) {
    return this.http.patch<any>(
      environment.backendServer + '/api/posts/' + postId + '/like',
      {
        userId: userId,
      }
    );
  }

  unlikePost(postId: string, userId: string) {
    return this.http.patch<any>(
      environment.backendServer + '/api/posts/' + postId + '/unlike',
      {
        userId: userId,
      }
    );
  }
  deletePost(postId: string) {
    return this.http.delete<number>(
      environment.backendServer + '/api/posts/' + postId
    );
  }
}
