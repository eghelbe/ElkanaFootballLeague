import { Component, OnInit } from '@angular/core';
import { Team, ComparePoints, CompareGoals } from '../team.model';
import { LeagueService } from '../league.service';
import { Router } from '@angular/router';
import { ExportService } from '../export.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})

export class LeagueTableComponent implements OnInit {

  public teams:Team[];

  constructor(public service: LeagueService,private router:Router, private exportService: ExportService, public _authService: AuthService) {}

  ngOnInit(){
    this.service.refreshNeeded$.subscribe(
      () => {
        this.getAllTeams()
      });
    this.getAllTeams();
    }

  private getAllTeams(){
    this.service.getAllTeams().subscribe(
      res => {
        this.teams = res;
        this.teams.sort(CompareGoals);
        this.teams.sort(ComparePoints);
        for (var i=0; i<this.teams.length;i++){
          this.teams[i].Position = i+1;
        }
      },
      err => console.error(err)
    )
  }

  onEditSelect(team:Team): void{
    this.router.navigate(["/team-view",team.Name]);
  }

  setStyle(team:Team){
    if(team.Position == 1){
      let styles = {
        'font-weight' : 'bold',
      };
      return styles;
    }
  }

  onEditTeamSelect(team){
    let dialogRef = this.service.openTeamAddOrEditDialog(team);
    dialogRef.afterClosed().subscribe(
      result => {
        if(typeof result !== undefined && result != null) {
          this.service.updateTeam(result).subscribe(
            res => this.service.openSnackBar(res, 'dismiss'),
            err =>{this.service.openSnackBar(err.error, 'dismiss');
            console.error(err);
          })
        } else {
          this.service.openSnackBar('Operation cancelled', 'dismiss')
        }
      }
    )
  }

  onAddTeamSelect(){
    let dialogRef = this.service.openTeamAddOrEditDialog();
    dialogRef.afterClosed().subscribe(
      result => {
        if(typeof result !== undefined && result != null) {
          this.service.addTeam(result).subscribe(
            res => this.service.openSnackBar(res, 'dismiss'),
            err =>{this.service.openSnackBar(err.error, 'dismiss');
            console.error(err);
          })
        } else {
          this.service.openSnackBar('Operation cancelled', 'dismiss')
        }
      }
    )
  }

  onDeleteSelect(team: Team){
    let dialogRef = this.service.openConfirmationDialog('Confirmation', 'Are you sure you want to delete the player: ' + team.Name + ' ?');
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
              this.service.deleteTeam(team).subscribe(
                res => {this.service.openSnackBar(res, 'dismiss');
                console.log(res);
              },
                err => {this.service.openSnackBar(err, 'dismiss');
                console.log(err);
              })
        } else {
          this.service.openSnackBar('Operation cancelled', 'dismiss')
        }
      }
    );
  }

  export(){
    this.exportService.exportExcel(this.teams, 'LeagueTable');
  }


  onCleanUpSelect(){
    this.service.getAllTeams().subscribe(
      res => {
        let teams = res;
        teams.forEach(team => {
          team.Ties = 0;
          team.Wins = 0;
          team.Loses = 0;
          team.GoalsAgainst = 0;
          team.GoalsFor = 0;
          team.Points = 0;
          team.Position = null;
          team.Games = 0;
          team.GoalsDiff = 0;
          this.service.updateTeam(team).subscribe(
            res =>
                this.service.openSnackBar(res, 'dismiss'),
            err =>{this.service.openSnackBar(err.error, 'dismiss');
                console.error(err);
            })
          }
        )
      })
    }
    
  
}