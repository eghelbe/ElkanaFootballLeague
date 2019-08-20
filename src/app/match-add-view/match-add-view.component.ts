import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { selectRequiredValidator, teamsMatchValidator, positiveNumberValidator, hourValidator, minuteValidator } from '../Shared/custom-validators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team, Match, weekDay } from '../team.model';

@Component({
  selector: 'app-match-add-view',
  templateUrl: './match-add-view.component.html',
  styleUrls: ['./match-add-view.component.css']
})
export class MatchAddViewComponent implements OnInit {

  MatchInfo: FormGroup;
  Teams: Team[];
  match: Match;
  editFlag: boolean;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MatchAddViewComponent>, private fb:FormBuilder) { }

  ngOnInit() {
    this.Teams = this.data.teams;  
    this.match = this.data.match;
    this.formInit();

    if(this.match != undefined){
      this.editFlag = true;
      this.formInit();
      this.setData();
    }
  }

  formInit(){
    this.MatchInfo=this.fb.group({
      _id: null,
      TeamA: [null, selectRequiredValidator(/null/)],
      TeamB: [null, selectRequiredValidator(/null/)],
      Day: [''],
      Time: this.fb.group({
        hours: [null, [Validators.required, hourValidator]],
        minutes: [null, [Validators.required, minuteValidator]]
    }),
      Date: [null, Validators.required],
      GoalsTeamA: [null, positiveNumberValidator],
      GoalsTeamB: [null, positiveNumberValidator],
      Comment: '',
      matchName: '',
      winner: null,
      CreationDate: new Date().toLocaleString()
      
    }, {validator: teamsMatchValidator});
  }

  setData(){
    this.match.Date = new Date(this.match.Date);
    this.hours.patchValue(this.match.Date.getHours());
    this.minutes.patchValue(this.match.Date.getMinutes());
    this.MatchInfo.patchValue(this.match);
    this.GoalsTeamA.setValidators(Validators.required);
    this.GoalsTeamB.setValidators(Validators.required);
    this.GoalsTeamA.updateValueAndValidity();
    this.GoalsTeamB.updateValueAndValidity();
  }

  onSubmit(){ 
    let match: Match = this.MatchInfo.value;
    match.Date.setHours(this.hours.value, this.minutes.value);
    match.matchName = this.getRandomInt();
    match.Day = weekDay[match.Date.getDay()];
    if(match.GoalsTeamA != null && match.GoalsTeamB != null){
      if(match.GoalsTeamA > match.GoalsTeamB){
        match.winner = match.TeamA;
      } else if (match.GoalsTeamA < match. GoalsTeamB){
        match.winner = match.TeamB;
      } else {
        match.winner = "Tie";
      }
    }
    this.dialogRef.close(match);
  }

  onCloseSelect(){
    this.dialogRef.close();
  }

  //Getters
  get TeamA(){
    return this.MatchInfo.get('TeamA');
  }
  get TeamB(){
    return this.MatchInfo.get('TeamB');
  }
  get Day(){
    return this.MatchInfo.get('Day');
  }
  get hours(){
    return this.MatchInfo.get('Time').get('hours');
  }
  get minutes(){
    return this.MatchInfo.get('Time').get('minutes');
  }
  get Date(){
    return this.MatchInfo.get('Date');
  }
  get GoalsTeamA(){
    return this.MatchInfo.get('GoalsTeamA');
  }
  get GoalsTeamB(){
    return this.MatchInfo.get('GoalsTeamB');
  }
  get Comment(){
    return this.MatchInfo.get('Comment');
  }

  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(1000000));
  }
}

