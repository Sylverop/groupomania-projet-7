import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CurrentUser } from '../signin/model/currentUser.model';
import { AuthService } from '../signin/service/auth.service';
import { Comment } from './model/comment.model';
import { CommentService } from './service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input()
  comment!: Comment;
  currentUser!: CurrentUser;
  currentUserId!: string;

  currentUserName!: string;
  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  notifierSubscription: Subscription =
    this.commentService.commentTopic.subscribe((notified) => {
      this.ngOnInit();
    });

  ngOnInit() {
    var userInLocalStorage: any = localStorage.getItem('currentUser');
    this.currentUserId = JSON.parse(userInLocalStorage)?.userId;
    this.currentUserName = JSON.parse(userInLocalStorage)?.name;
  }
}
