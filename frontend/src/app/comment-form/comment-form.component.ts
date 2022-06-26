import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../subscribe/model/user.model';
import { CommentService } from '../comment/service/comment.service';
import { PostListService } from '../post-list/service/post-list.service';

import { CommentFormService } from './service/comment-form.service';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UserService } from '../subscribe/service/user.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  currentUser!: User;

  constructor(
    private commentFormService: CommentFormService,
    private postListService: PostListService,
    private userService: UserService
  ) {}

  @Input()
  postId!: string;

  ngOnInit(): void {}

  async onSubmit(form: NgForm) {
    var userIdInLocalStorage = localStorage.getItem('userId');
    if (userIdInLocalStorage) {
      this.userService
        .getUser(JSON.parse(userIdInLocalStorage))
        .pipe(
          map((user: any) => {
            this.commentFormService.addCommentToPost(
              this.postId,
              user.name,
              form.value.comment
            );
            this.postListService.notifyCommentAdded();
          }),
          catchError((err) => err)
        )
        .subscribe();
    } else {
      console.error(
        'Impossible de recuperer le user name dans le localstorage'
      );
    }
  }
}
