import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Member } from './models/member.model';
import { environment } from 'src/environments/environment';
import { MemberService } from './service/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members!: Member[];
  environment;

  constructor(private memberService: MemberService) {
    this.environment = environment;
  }

  ngOnInit(): void {
    this.memberService
      .list()
      .pipe(
        map((data) => {
          this.members = data;
        })
      )
      .subscribe();
  }
}
