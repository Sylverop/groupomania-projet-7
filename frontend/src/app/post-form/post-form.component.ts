import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../signin/service/auth.service';
import { PostFormService } from './service/post-form.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  submitted = false;
  fileName!: '';
  constructor(
    private postFormService: PostFormService,

    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.postForm = this.formBuilder.group({
      postContent: ['', Validators.required],
      postImage: [''],
      fileSource: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        this.postForm.patchValue({
          fileSource: file,
        });
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('message', this.postForm.get('postContent')?.value);
      formData.append('authorName', this.authService.getCurrentUser().name);
      formData.append('image', this.postForm.get('fileSource')?.value);

      this.postFormService.addPost(formData).subscribe((success) => {
        this.postForm.reset();
        formData.delete;
      });
    }
  }
}
