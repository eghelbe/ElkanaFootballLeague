import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-team-add-view',
  templateUrl: './team-add-view.component.html',
  styleUrls: ['./team-add-view.component.css']
})
export class TeamAddViewComponent implements OnInit {
  
  TeamInfo:FormGroup;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TeamAddViewComponent>, private fb:FormBuilder) { }

  ngOnInit() {
    this.formInit();
    if(this.data != undefined){
      this.setData();
    }
  }

  formInit(){
    this.TeamInfo=this.fb.group({
      _id: null,
      Name: ['', Validators.required],
      Position: null,
      Games: 0,
      Wins: 0,
      Loses: 0,
      Ties: 0,
      GoalsAgainst: 0,
      GoalsFor: 0,
      GoalsDiff: 0,
      Points: 0,
      CreationDate: new Date().toLocaleString()
    });
  }

  setData(){
    this.TeamInfo.patchValue(this.data);
  }

  onSubmit(){
    this.dialogRef.close(this.TeamInfo.value);
  }

  onCloseSelect(){
    this.dialogRef.close();
  }

  get Name(){
    return this.TeamInfo.get('Name');
  }
}

