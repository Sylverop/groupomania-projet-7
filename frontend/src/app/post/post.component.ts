import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostListService } from '../post-list/service/post-list.service';
import { DateHelper } from '../shared/date.helper';
import { CurrentUser } from '../signin/model/currentUser.model';
import { AuthService } from '../signin/service/auth.service';
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
  environment;
  postImage!: string;
  currentUser: CurrentUser;

  constructor(
    private postService: PostService,
    private postListService: PostListService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.environment = environment;
  }

  ngOnInit() {
    var userInLocalStorage: any = localStorage.getItem('currentUser');
    this.currentUserId = JSON.parse(userInLocalStorage)?.userId;
    this.currentUserName = JSON.parse(userInLocalStorage)?.name;
    this.postImage = environment.backendServer + '/' + this.post.imageUrl;
  }
  isPostToday() {
    return DateHelper.isToday(this.post.date);
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
  onclickModify(postId: string) {
    this.router.navigate(['/modifypost']);
  }
}
