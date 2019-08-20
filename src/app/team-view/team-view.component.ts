import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Players, Team } from '../team.model';
import { LeagueService } from '../league.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {

  public players:Players[];
  public Id;
  public teams:Team[];

  constructor(private service: LeagueService, private route:ActivatedRoute, public _authService: AuthService, private _location: Location) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=> {
      this.Id = params.get('id');
    });
    this.service.refreshNeeded$.subscribe(
      () => {
        this.getPlayersByTeamName()
      });
    this.getPlayersByTeamName();
    this.getAllTeams();
  }

  private getPlayersByTeamName(){
    this.service.getPlayersByTeamName(this.Id).subscribe(
      res => this.players = res,
      err => console.error(err)
    )
  }

  private getAllTeams(){
    this.service.getAllTeams().subscribe(
      res => this.teams = res,
      err => console.error(err)
    )
  }

  onAddPlayerSelect(){
    let dialogRef = this.service.openPlayerAddOrEditDialog(this.teams);
    dialogRef.afterClosed().subscribe(
      result => {
        if(typeof result !== undefined && result != null) {
          this.service.addPlayer(result).subscribe(
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

  onEditSelect(player: Players){
    let dialogRef = this.service.openPlayerAddOrEditDialog(this.teams, player);
    dialogRef.afterClosed().subscribe(
      result => {
        if(typeof result !== undefined && result != null) {
          this.service.updatePlayer(result).subscribe(
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

  onDeleteSelect(player: Players){
    let dialogRef = this.service.openConfirmationDialog('Confirmation', 'Are you sure you want to delete the player: ' + player.FirstName + ' ?');
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
              this.service.deletePlayer(player).subscribe(
                res => this.service.openSnackBar(res, 'dismiss'),
                err => this.service.openSnackBar(err, 'dismiss')
              )
        } else {
          this.service.openSnackBar('Operation cancelled', 'dismiss')
        }
      }
    );
  }

  setStyle(player: Players){
    if(player.Coordinator){
      let styles = {
        'font-weight' : 'bold',
      };
      return styles;
    }
  }

  onBackSelect(){
    this._location.back();
  }

}
