import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users.models';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'da-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user:Users = {};
  constructor(public accountService:AccountService) {}
  ngOnInit(): void {
  }
  login() {
    this.accountService.login(this.user).subscribe({
      next: () => {},
      error: (error) => {
        console.log(error);
      }
    });
  }
  logout() {
    this.accountService.logout();
  }
}
