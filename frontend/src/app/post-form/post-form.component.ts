import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { User } from '../subscribe/model/user.model';
import { PostListService } from '../post-list/service/post-list.service';

import { PostFormService } from './service/post-form.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  currentUser!: User;
  fileToUpload = File;
  constructor(
    private postFormService: PostFormService,
    private postListService: PostListService,
    private reactiveForm: ReactiveFormsModule
  ) {}

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    var currentUserInLocalStorage: any = localStorage.getItem('currentUser');
    if (currentUserInLocalStorage) {
      this.postFormService.addPost(
        form.value.postContent,
        form.value.postImage,
        JSON.parse(currentUserInLocalStorage)?.name
      );
      this.postListService.notifyPostAdded();
    } else {
      console.error('Impossible de recuperer le user id dans le localstorage');
    }
  }
  onFileSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files![0];
  }
  envoieDuFichier() {}
}
