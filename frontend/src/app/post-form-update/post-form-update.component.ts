import { Component, OnInit } from '@angular/core';
import { Post } from '../post/models/post.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostListService } from '../post-list/service/post-list.service';
import { AuthService } from '../signin/service/auth.service';
import { PostFormService } from '../post-form/service/post-form.service';
import { PostFormUpdateService } from './service/post-form-update.service';

@Component({
  selector: 'app-post-form-update',
  templateUrl: './post-form-update.component.html',
  styleUrls: ['./post-form-update.component.css'],
})
export class PostFormUpdateComponent implements OnInit {
  posts!: Post;

  postFormUpdate!: FormGroup;
  submitted = false;
  constructor(
    private postFormService: PostFormService,
    private postFormUpdateService: PostFormUpdateService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.postFormUpdate = this.formBuilder.group({
      postContent: ['', Validators.required],
      postImage: [''],
      fileSource: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.postFormUpdate.patchValue({
        fileSource: file,
      });
    }
  }

  onUpdateSubmit() {
    this.submitted = true;
    if (this.postFormUpdate.valid) {
      const formData = new FormData();
      formData.append('message', this.postFormUpdate.get('postContent')?.value);
      formData.append('authorName', this.authService.getCurrentUser().name);
      formData.append('image', this.postFormUpdate.get('fileSource')?.value);

      this.postFormUpdateService.updatePost(formData).subscribe((success) => {
        this.postFormUpdate.reset();
        formData.delete;
      });
    }
  }
}
