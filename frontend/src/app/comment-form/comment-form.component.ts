import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../subscribe/model/user.model';

import { PostListService } from '../post-list/service/post-list.service';

import { CommentFormService } from './service/comment-form.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  currentUser!: User;

  constructor(
    private commentFormService: CommentFormService,
    private postListService: PostListService
  ) {}

  @Input()
  postId!: string;

  ngOnInit(): void {}

  async onSubmit(form: NgForm) {
    var currentUserInLocalStorage = localStorage.getItem('currentUser');
    if (currentUserInLocalStorage) {
      this.commentFormService.addCommentToPost(
        this.postId,
        JSON.parse(currentUserInLocalStorage)?.name,
        form.value.comment
      );
      this.postListService.notifyCommentAdded();
    } else {
      console.error(
        'Impossible de recuperer le user name dans le localstorage'
      );
    }
  }
}
