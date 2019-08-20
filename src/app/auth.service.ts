import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LeagueService } from './league.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private http: HttpClient, private _router:Router, private service:LeagueService) { }

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logoutUser(){
    let dialogRef = this.service.openConfirmationDialog('Confirmation', 'Are you sure you want to Logout ?');
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          localStorage.removeItem('token');
          this.service.openSnackBar('Successfully Logged out', 'dismiss');
          this.service.openDialog('Confirmation','Successfully Logged out');
        } else {
          this.service.openSnackBar('Operation cancelled', 'dismiss')
        }
      }
    );
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
