import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}

  commentTopic: Subject<null> = new Subject<null>();

  notifyCommentAdded() {
    this.commentTopic.next(null);
  }
}
