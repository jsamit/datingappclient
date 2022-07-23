import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppUser } from './models/app-user';
import { Users } from './models/users.models';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DatingApp';
  users:Users[] = [];

  constructor(private http: HttpClient,private accountService:AccountService) {}

  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }
  getUsers() {
    this.http.get<Users[]>('https://localhost:5001/api/users')
    .subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => console.log(error)
    });
  }  

  setCurrentUser() {
    this.accountService.setCurrentUser(JSON.parse(localStorage.getItem('user')));
  }
}
