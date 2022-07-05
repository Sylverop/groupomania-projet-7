import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { PostFormUpdateService } from './service/post-form-update.service';

@Component({
  selector: 'app-post-form-update',
  templateUrl: './post-form-update.component.html',
  styleUrls: ['./post-form-update.component.css'],
})
export class PostFormUpdateComponent implements OnInit {
  postForm!: FormGroup;
  postId: string = '0';
  fileName!: '';
  postImage: string = '';
  submitted: boolean = false;

  constructor(
    private postFormUpdateService: PostFormUpdateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.formBuilder.group({
      postContent: ['', Validators.required],
      postImage: [''],
      fileSource: ['', Validators.required],
    });
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
    });

    this.postFormUpdateService.getPostById(this.postId).subscribe((data) => {
      this.postForm = this.formBuilder.group({
        postContent: [data.message, Validators.required],
        postImage: [''],
        fileSource: ['', Validators.required],
      });
      this.postImage = environment.backendServer + '/' + data.imageUrl;
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
      formData.append('image', this.postForm.get('fileSource')?.value);
      this.postFormUpdateService
        .updatePost(this.postId, formData)
        .subscribe(() => {
          this.postForm.reset();
          formData.delete;
        });
      this.router.navigate(['/posts']);
    }
  }
}
