import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostListService {
  postTopic: Subject<null> = new Subject<null>();
  commentTopic: Subject<null> = new Subject<null>();
  likeTopic: Subject<null> = new Subject<null>();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get<any>(environment.backendServer + '/api/posts/');
  }

  notifyPostAdded() {
    this.postTopic.next(null);
  }

  notifyCommentAdded() {
    this.commentTopic.next(null);
  }

  notifyLikeOrUnlike() {
    this.likeTopic.next(null);
  }
}
