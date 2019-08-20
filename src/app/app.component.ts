import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LeagueService } from './league.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Football';
  public users: any;

  constructor(public _authService: AuthService, private service:LeagueService) {}

  ngOnInit() {
    this.service.getAllUsers().subscribe(
      res => this.users = res,
      err => console.error(err),
    )
  }

  onLoginSelect(){
    let dialogRef = this.service.openLoginDialog(this.users);
    dialogRef.afterClosed().subscribe(
      result => {
        if(typeof result !== undefined && result != null) {
          this._authService.loginUser(result).subscribe(
            res => {
              localStorage.setItem('token', res.token);
              this.service.openSnackBar('Successfuly Logged In', 'dismiss');
              this.service.openDialog('Confirmation','Successfully Logged In');
            },
            err =>{
              this.service.openSnackBar(err.error, 'dismiss');
              console.error(err);
              this.onLoginSelect();
          })
        } else {
          this.service.openSnackBar('Operation cancelled', 'dismiss')
        }
      }
    );
  }
}
