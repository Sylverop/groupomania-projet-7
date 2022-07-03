import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommentService } from '../comment/service/comment.service';

import { Post } from '../post/models/post.model';

import { PostListService } from './service/post-list.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts!: Array<Post>;

  constructor(
    private postListService: PostListService,
    private commentService: CommentService
  ) {}

  postSubscription: Subscription = this.postListService.postTopic.subscribe(
    (notified) => {
      this.ngOnInit();
    }
  );

  commentSubscription: Subscription =
    this.postListService.commentTopic.subscribe((notified) => {
      this.ngOnInit();
    });

  likeSubscription: Subscription = this.postListService.likeTopic.subscribe(
    (notified) => {
      this.ngOnInit();
    }
  );

  async ngOnInit() {
    await this.listPosts();
    this.commentService.notifyCommentAdded();
  }

  async listPosts() {
    this.postListService
      .getPosts()
      .pipe(
        map((data: any) => {
          this.posts = data;
        }),
        catchError((err) => err)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
    this.commentSubscription.unsubscribe();
    this.likeSubscription.unsubscribe();
  }
}
