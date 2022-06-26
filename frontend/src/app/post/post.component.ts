import { Component, Input, OnInit } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { PostListService } from '../post-list/service/post-list.service';
import { Post } from './models/post.model';
import { PostService } from './service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input()
  post!: Post;
  posts$!: Observable<Post>;
  loading!: boolean;
  errorMessage!: string;
  currentUserId!: string;

  constructor(
    private postService: PostService,
    private postListService: PostListService
  ) {}

  ngOnInit() {
    var userInLocalStorage = localStorage.getItem('userId');
    if (userInLocalStorage) {
      this.currentUserId = JSON.parse(userInLocalStorage);
    }
  }

  onLikeOrDislike(postId: string, liked: boolean) {
    if (!liked) {
      this.postService
        .likePost(postId, this.currentUserId)
        .pipe(
          map((data: any) => data),
          catchError((err) => err)
        )
        .subscribe();
    } else if (liked) {
      this.postService
        .unlikePost(postId, this.currentUserId)
        .pipe(
          map((data: any) => data),
          catchError((err) => err)
        )
        .subscribe();
    }
    this.postListService.notifyLikeOrUnlike();
  }
}
