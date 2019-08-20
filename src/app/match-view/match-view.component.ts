import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Match } from '../team.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LeagueService } from '../league.service';
import { selectRequiredValidator } from '../Shared/custom-validators';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})
export class MatchViewComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router, private route:ActivatedRoute, private service: LeagueService) { }

  public match: Match;
  public Id;
  matchInfo :FormGroup;

  ngOnInit() {
    this.formInit();
  }

  formInit(){
    this.matchInfo=this.fb.group({
      TeamA: ['', Validators.required],
      TeamB: ['', Validators.required],
      Day: ['', Validators.required], 
      Time: this.fb.group({
        Hour: ['', Validators.required],
        Minute: ['', Validators.required]
    }),
      Date: [new Date(), Validators.required],
      GoalsTeamA: [null],
      GoalsTeamB: [null],
      Comment: ['']
    });
  }

  setData(){
    this.matchInfo.patchValue(this.match);
    // this.player = data as Players;
  }

  onSubmit(){
    console.log(this.matchInfo.value);
  }

  onBackSelect(){
    this.router.navigate(["/league-matches-table"]);
  }

  //Getters
  //General Information
  get TeamA(){
    return this.matchInfo.get('TeamA');
  }
  get TeamB(){
    return this.matchInfo.get('TeamB');
  }
  get Day(){
    return this.matchInfo.get('Day');
  }
  get Hour(){
    return this.matchInfo.get('Time').get('Hour');
  }
  get Minute(){
    return this.matchInfo.get('Time').get('Minute');
  }
  get Date(){
    return this.matchInfo.get('Date');
  }
  get GoalsTeamA(){
    return this.matchInfo.get('GoalsTeamA');
  }
  get GoalsTeamB(){
    return this.matchInfo.get('GoalsTeamB');
  }
  get Comment(){
    return this.matchInfo.get('Comment');
  }
}
