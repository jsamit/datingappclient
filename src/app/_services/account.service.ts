import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { AppUser } from '../models/app-user';
import { Users } from '../models/users.models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'https://localhost:5001/api/account/';
  private currentUserSource = new ReplaySubject<AppUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http:HttpClient) {}
  
  login(user:Users) {
    return this.http.post<AppUser>(this.baseUrl+'login',user).pipe(
      map((response:AppUser) => {
        this.setUserInLocalStorage(user);
      })
    );
  }

  register(user:any) {
    return this.http.post<AppUser>(this.baseUrl + 'register',user).pipe(
      map(response => this.setUserInLocalStorage(response))
    );
  }

  setCurrentUser(user:AppUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  private setUserInLocalStorage(user:AppUser) {
    if(user) {
      localStorage.setItem('user',JSON.stringify(user));
      this.currentUserSource.next(user);
    }
  }
}
