import { Component, OnInit } from '@angular/core';
import { Match, Team, weekDay } from '../team.model';
import { LeagueService } from '../league.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-league-matches-table',
  templateUrl: './league-matches-table.component.html',
  styleUrls: ['./league-matches-table.component.css']
})
export class LeagueMatchesTableComponent implements OnInit {

  public matches: Match[];
  public teams:Team[];
  public matchName;

  constructor(public service: LeagueService,private router:Router, public _authService: AuthService) { }

  ngOnInit() {
    this.service.refreshNeeded$.subscribe(
      () => {
        this.getAllMatches()
      });
    this.getAllMatches();
    this.getAllTeams();
  }

  private getAllMatches(){
    this.service.getAllMatches().subscribe(
      res => {
        this.matches = res;
        this.matches.forEach(match => {
          match.Date = new Date(match.Date)
        });
      },
      err => console.error(err)
    )
  }

  private getAllTeams(){
    this.service.getAllTeams().subscribe(
      res => this.teams = res,
      err => console.error(err)
    )
  }
  onAddMatchSelect(){
    let dialogRef = this.service.openMatchAddOrEditDialog(this.teams);
    dialogRef.afterClosed().subscribe(
      result => {
        if(typeof result !== undefined && result != null) {
          this.service.addMatch(result).subscribe(
            res => this.service.openSnackBar(res, 'dismiss'),
            err =>{this.service.openSnackBar(err.error, 'dismiss');
            console.error(err);
          })
        } else {
          this.service.openSnackBar('Operation cancelled', 'dismiss')
        }
      }
    );
  }

  onEditSelect(match: Match){
    let dialogRef = this.service.openMatchAddOrEditDialog(this.teams, match);
    dialogRef.afterClosed().subscribe(
      result => {
        if(typeof result !== undefined && result != null) {
          this.service.updateMatch(result, match).subscribe(
            res => this.service.openSnackBar(res, 'dismiss'),
            err =>{this.service.openSnackBar(err.error, 'dismiss');
            console.error(err);
          })
        } else {
          this.service.openSnackBar('Operation cancelled', 'dismiss')
        }
      }
    );
  }

  onDeleteSelect(match: Match){
    let dialogRef = this.service.openConfirmationDialog('Confirmation', 'Are you sure you want to delete the match: ' + match.matchName + ' ?');
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
              this.service.deleteMatch(match).subscribe(
                res => this.service.openSnackBar(res, 'dismiss'),
                err => this.service.openSnackBar(err, 'dismiss')
              )
        } else {
          this.service.openSnackBar('Operation cancelled', 'dismiss')
        }
      }
    );
  }

  wasOccurred(match){
    if(match.GoalsTeamA != null && match.GoalsTeamB != null){
      return true;
    } else {
      return false;
    }
  }

  winnerA(match){
    let styles = {};
    if (match.GoalsTeamA != null && match.GoalsTeamB != null){
      if (match.GoalsTeamA > match.GoalsTeamB){
        styles = {
          'font-weight': 'bold'
        };
      }
    }
    return styles;
  }

  winnerB(match){
    let styles = {};
    if (match.GoalsTeamA != null && match.GoalsTeamB != null){
      if (match.GoalsTeamA < match.GoalsTeamB){
        styles = {
          'font-weight': 'bold'
        };
      }
    }
    return styles;
  }
}
