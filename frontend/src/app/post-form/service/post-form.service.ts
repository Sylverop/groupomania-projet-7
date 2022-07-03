import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostFormService {
  subjectNotifier: Subject<null> = new Subject<null>();

  constructor(private http: HttpClient, public router: Router) {}

  addPost(post: any): Observable<Boolean> {
    return this.http
      .post<any>(`${environment.backendServer}/api/posts/`, post)
      .pipe(
        map((addedPost: any) => {
          if (addedPost != null) {
            this.subjectNotifier.next;
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
