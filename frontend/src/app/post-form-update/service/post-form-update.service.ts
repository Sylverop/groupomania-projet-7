import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Post } from 'src/app/post/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostFormUpdateService {
  subjectNotifier: Subject<null> = new Subject<null>();

  constructor(private http: HttpClient, public router: Router) {}

  getPostById(id: string) {
    return this.http
      .get<Post>(environment.backendServer + '/api/posts/' + id)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  updatePost(post: any): Observable<Boolean> {
    return this.http
      .put<any>(`${environment.backendServer}/api/posts/`, post)
      .pipe(
        map((updatedPost: any) => {
          if (updatedPost != null) {
            this.subjectNotifier.next;
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
