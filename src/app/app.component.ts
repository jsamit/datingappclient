import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Users } from './models/users.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DatingApp';
  users:Users[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
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
}
