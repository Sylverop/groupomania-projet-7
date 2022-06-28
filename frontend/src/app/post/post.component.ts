import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  loading!: boolean;
  errorMessage!: string;
  currentUserId!: string;
  authorName!: string;
  currentUserName!: string;
  posts!: Observable<Post[]>;
  constructor(
    private postService: PostService,
    private postListService: PostListService,
    private router: Router
  ) {}

  ngOnInit() {
    var userInLocalStorage: any = localStorage.getItem('currentUser');
    this.currentUserId = JSON.parse(userInLocalStorage)?.userId;
    this.currentUserName = JSON.parse(userInLocalStorage)?.name;
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

  /* getSoftPosts() {
    this.posts = this.postService.getPostFromStore();
  } */

  onDeletePost(postId: string) {
    this.postService
      .deletePost(postId)
      .pipe(
        map((data: any) => data),
        catchError((err) => err)
      )
      .subscribe();
    this.router.navigate(['/posts']).then((data) => {
      // TODO : remplacer par evenement
      window.location.reload();
    });
  }
}
