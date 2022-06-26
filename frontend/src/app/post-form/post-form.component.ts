import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../subscribe/model/user.model';
import { PostListService } from '../post-list/service/post-list.service';

import { PostFormService } from './service/post-form.service';
import { UserService } from '../subscribe/service/user.service';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  currentUser!: User;

  constructor(
    private postFormService: PostFormService,
    private postListService: PostListService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    var userIdInLocalStorage = localStorage.getItem('userId');
    if (userIdInLocalStorage) {
      this.userService
        .getUser(JSON.parse(userIdInLocalStorage))
        .pipe(
          map((user: any) => {
            this.postFormService.addPost(
              form.value.postContent,
              form.value.postImage,
              user.name
            );
            this.postListService.notifyPostAdded();
          }),
          catchError((err) => err)
        )
        .subscribe();
    } else {
      console.error('Impossible de recuperer le user id dans le localstorage');
    }
  }
}
