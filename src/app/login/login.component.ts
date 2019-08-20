import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { selectRequiredValidator } from '../Shared/custom-validators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserInfo: FormGroup;
  users: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LoginComponent>, private fb:FormBuilder) { }

  ngOnInit() {
    this.users = this.data.users;
    this.formInit();
  }

  formInit(){
    this.UserInfo=this.fb.group({
      username: ['default', selectRequiredValidator(/default/)],
      password: ['', Validators.required]
    });
  }

  onSubmit(){ 
    this.dialogRef.close(this.UserInfo.value);
  }

  onCloseSelect(){
    this.dialogRef.close();
  }

  get username(){
    return this.UserInfo.get('username');
  }
  get password(){
    return this.UserInfo.get('password');
  }
}

