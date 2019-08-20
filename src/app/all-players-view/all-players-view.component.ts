import { Component, OnInit } from '@angular/core';
import { Players, Team } from '../team.model';
import { LeagueService } from '../league.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-all-players-view',
  templateUrl: './all-players-view.component.html',
  styleUrls: ['./all-players-view.component.css']
})
export class AllPlayersViewComponent implements OnInit {

  public result = undefined;
  public error = undefined;
  public players:Players[];
  public teams:Team[];
  public coordinator = undefined;

  constructor(public service: LeagueService, public _authService: AuthService) { }

  ngOnInit() {
    this.service.refreshNeeded$.subscribe(
      () => {
        this.getAllPlayers()
      });
    this.getAllPlayers();
    this.getAllTeams();
  }

  private getAllPlayers(){
    this.service.getAllPlayers().subscribe(
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

  setStyle(player:Players){
    if(player.Coordinator){
      let styles = {
        'font-weight' : 'bold',
      };
      return styles;
    }
  }
}
