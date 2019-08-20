import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Team, Players, Match } from './team.model';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { MatSnackBar } from '@angular/material'
import { TeamAddViewComponent } from './team-add-view/team-add-view.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { MatchAddViewComponent } from './match-add-view/match-add-view.component';
import { LoginComponent } from './login/login.component';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private _serverUrl = "http://localhost:3000/";
  //Post Urls
  private _apiUrl = this._serverUrl + "api/";
  //Team
  private _addTeamUrl = this._apiUrl + "teamAdd";
  private _updateTeamUrl = this._apiUrl + "teamUpdate";
  private _deleteTeamUrl = this._apiUrl + "teamDelete";
  //Player
  private _updatePlayerUrl = this._apiUrl + "playerUpdate";
  private _addPlayerUrl = this._apiUrl + "playerAdd";
  private _deletePlayerUrl = this._apiUrl + "playerDelete";
  //Match
  private _updateMatchUrl = this._apiUrl + "matchUpdate";
  private _addMatchUrl = this._apiUrl + "matchAdd";
  private _deleteMatchUrl = this._apiUrl + "matchDelete";

  //Get Urls
  private _OdataUrl = this._serverUrl + "Odata/";
  private _getAllTeamsUrl = this._OdataUrl + "getAllTeams";
  private _getTeamByNameUrl = this._OdataUrl + "getTeamByName";
  private _getAllPlayersUrl = this._OdataUrl + "getAllPlayers";
  private _getPlayerByIdUrl = this._OdataUrl + "getPlayerById";
  private _getPlayersByTeamNameUrl = this._OdataUrl + "getPlayersByTeamName";
  private _getAllMatchesUrl = this._OdataUrl + "getAllMatches";
  private _getAllUsersUrl = this._OdataUrl + "getAllUsers";
  private _getMatchByIdUrl = this._OdataUrl + "getMatchById";

  constructor(private http: HttpClient, public dialog: MatDialog,  private snackBar: MatSnackBar) { }

  private _refreshNeeded$= new Subject<void>();
  public errorMsg;
  public loading = false;
  public showSpinner=false;

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  //Post Methods
  //Team
  addTeam(team) {
    return this.http.post(this._addTeamUrl, team, {responseType: 'text'}).pipe(
      catchError(this.errorHandler),
      tap(() => { this._refreshNeeded$.next();
      })
    );
  }

  updateTeam(team) {
    return this.http.post(this._updateTeamUrl, team, {responseType: 'text'}).pipe(
      catchError(this.errorHandler),
      tap(() => { this._refreshNeeded$.next();
      })
    );
  }

  deleteTeam(team) {
    return this.http.post(this._deleteTeamUrl, team, {responseType: 'text'}).pipe(
      catchError(this.errorHandler),
      tap(() => { this._refreshNeeded$.next();
      })
    );
  }

  //Player
  addPlayer(player) {
    return this.http.post(this._addPlayerUrl, player, {responseType: 'text'}).pipe(
      catchError(this.errorHandler),
      tap(() => { this._refreshNeeded$.next();
      })
    );
  }

  updatePlayer(player) {
    return this.http.post(this._updatePlayerUrl, player, {responseType: 'text'}).pipe(
      catchError(this.errorHandler),
      tap(() => { this._refreshNeeded$.next();
      })
    );
  }

  deletePlayer(player) {
    return this.http.post(this._deletePlayerUrl, player, {responseType: 'text'}).pipe(
      catchError(this.errorHandler),
      tap(() => { this._refreshNeeded$.next();
      })
    );
  }

  //Match
  addMatch(match) {
    return this.http.post(this._addMatchUrl, match, {responseType: 'text'}).pipe(
      catchError(this.errorHandler),
      tap(() => { 
        if(match.GoalsTeamA != null && match.GoalsTeamB != null){
          this.matchAdded(match);
        }
        this._refreshNeeded$.next();
      })
    );
  }

  updateMatch(match, oldMatch) {
    return this.http.post(this._updateMatchUrl, match, {responseType: 'text'}).pipe(
      catchError(this.errorHandler),
      tap(() => { 
        if(match.GoalsTeamA != null && match.GoalsTeamB != null){
          this.matchUpdated(match, oldMatch);
        }
        this._refreshNeeded$.next();
      })
    );
  }

  deleteMatch(match) {
    return this.http.post(this._deleteMatchUrl, match, {responseType: 'text'}).pipe(
      catchError(this.errorHandler),
      tap(() => {
        this.matchDeleted(match);
        this._refreshNeeded$.next();
      })
    );
  }

  //Get Methods
  //getAll methods
  getAllTeams(): Observable<Team[]>
  {
    this.showSpinner=true;
    return this.http.get<Team[]>(this._getAllTeamsUrl).pipe(
      catchError(this.errorHandler),
      tap(() => this.showSpinner=false));
  }

  getAllPlayers(): Observable<Players[]>
  {
    this.showSpinner=true;
    return this.http.get<Players[]>(this._getAllPlayersUrl).pipe(
      catchError(this.errorHandler),
      tap(() => this.showSpinner=false));
  }

  getAllMatches(): Observable<Match[]>
  {
    this.showSpinner=true;
    return this.http.get<Match[]>(this._getAllMatchesUrl).pipe(
      catchError(this.errorHandler),
      tap(() => this.showSpinner=false));
  }

  getAllUsers(): Observable<any[]>
  {
    this.showSpinner=true;
    return this.http.get<any[]>(this._getAllUsersUrl).pipe(
      catchError(this.errorHandler),
      tap(() => this.showSpinner=false));
  }

  //Player methods
  getPlayerById(Id): Observable<Players>
  {
    this.showSpinner=true;
    return this.http.get<Players>(this._getPlayerByIdUrl + `/${Id}`).pipe(
      catchError(this.errorHandler),
      tap(() => this.showSpinner=false));
  }

  getPlayersByTeamName(teamName): Observable<Players[]>
  {
    this.showSpinner=true;
    return this.http.get<Players[]>(this._getPlayersByTeamNameUrl + `/${teamName}`).pipe(
      catchError(this.errorHandler),
      tap(() => this.showSpinner=false));
  }

  getTeamByName(name): Observable<Team>
  {
    this.showSpinner=true;
    return this.http.get<Team>(this._getTeamByNameUrl + `/${name}`).pipe(
      catchError(this.errorHandler),
      tap(() => this.showSpinner=false));
  }

  getMatchById(matchName): Observable<Match>
  {
    this.showSpinner=true;
    return this.http.get<Match>(this._getMatchByIdUrl + `/${matchName}`).pipe(
      catchError(this.errorHandler),
      tap(() => this.showSpinner=false));
  }

  //Dialogs & Snackbar
  openConfirmationDialog(title, content){
    return this.dialog.open(DialogConfirmationComponent, {data: {title: title, content: content}, disableClose: true})
  }

  openDialog(title, content){
    return this.dialog.open(DialogComponent, {data: {title: title, content: content}, disableClose: true})
  }
  
  openTeamAddOrEditDialog(team?){
    return this.dialog.open(TeamAddViewComponent, {data: team, disableClose: true})
  }

  openPlayerAddOrEditDialog(teams, player?){
    return this.dialog.open(PlayerViewComponent, {data: {player , teams}, disableClose: true})
  }

  openMatchAddOrEditDialog(teams, match?){
    return this.dialog.open(MatchAddViewComponent, {data: {match , teams}, disableClose: true})
  }

  openLoginDialog(users){
    return this.dialog.open(LoginComponent, {data: {users}, disableClose: true})
  }

  errorHandler(error){
    return throwError(error || "Server Error");
  }
  
  openSnackBar(message, action?){
    this.snackBar.open(message, action, {duration: 4000});
  }

  matchAdded(match){
    if(match.winner != null && match.winner != undefined){
      this.getTeamByName(match.TeamA).subscribe(
        res => {
          let TeamA = res;
          if(match.winner == "Tie"){
            TeamA.Ties = TeamA.Ties + 1;
          } else if (match.winner == TeamA.Name){
            TeamA.Wins = TeamA.Wins + 1;
          } else {
            TeamA.Loses = TeamA.Loses + 1;
          }
          TeamA.GoalsFor = TeamA.GoalsFor + match.GoalsTeamA;
          TeamA.GoalsAgainst = TeamA.GoalsAgainst + match.GoalsTeamB;
          TeamA.Games = TeamA.Wins + TeamA.Loses + TeamA.Ties;
          TeamA.GoalsDiff = TeamA.GoalsFor - TeamA.GoalsAgainst;
          TeamA.Points = (TeamA.Wins * 3) + TeamA.Ties;
          this.updateTeam(TeamA).subscribe(
            res => this.openSnackBar(res, 'dismiss'),
            err => {this.openSnackBar(err.error, 'dismiss');
            console.error(err);
          });
        },
        err => console.error(err)
      );
      this.getTeamByName(match.TeamB).subscribe(
        res => {
          let TeamB = res;
          if(match.winner == "Tie"){
            TeamB.Ties = TeamB.Ties + 1;
          } else if (match.winner == TeamB.Name){
            TeamB.Wins = TeamB.Wins + 1;
          } else {
            TeamB.Loses = TeamB.Loses + 1;
          }
          TeamB.GoalsFor = TeamB.GoalsFor + match.GoalsTeamB;
          TeamB.GoalsAgainst = TeamB.GoalsAgainst + match.GoalsTeamA;
          TeamB.Games = TeamB.Wins + TeamB.Loses + TeamB.Ties;
          TeamB.GoalsDiff = TeamB.GoalsFor - TeamB.GoalsAgainst;
          TeamB.Points = (TeamB.Wins * 3) + TeamB.Ties;
          this.updateTeam(TeamB).subscribe(
            res => this.openSnackBar(res, 'dismiss'),
            err => {this.openSnackBar(err.error, 'dismiss');
            console.error(err);
          });
        },
        err => console.error(err)
      );
    }
  }

  matchDeleted(match){
    if(match.winner != null && match.winner != undefined){
      this.getTeamByName(match.TeamA).subscribe(
        res => {
          let TeamA: Team = res;
          TeamA.GoalsAgainst = TeamA.GoalsAgainst - match.GoalsTeamB;
          TeamA.GoalsFor = TeamA.GoalsFor - match.GoalsTeamA;
          if(match.winner == TeamA.Name){
            TeamA.Wins = TeamA.Wins - 1;
          } else if( match.winner == "Tie"){
            TeamA.Ties = TeamA.Ties - 1;
          } else {
            TeamA.Loses = TeamA.Loses - 1;
          }
          TeamA.Games = TeamA.Wins + TeamA.Loses + TeamA.Ties;
          TeamA.GoalsDiff = TeamA.GoalsFor - TeamA.GoalsAgainst;
          TeamA.Points = (TeamA.Wins * 3) + TeamA.Ties;
          this.updateTeam(TeamA).subscribe(
            res => this.openSnackBar(res, 'dismiss'),
            err =>{this.openSnackBar(err.error, 'dismiss');
            console.error(err);
          });
        },
        err => console.error(err)
      );
      this.getTeamByName(match.TeamB).subscribe(
        res => {
          let TeamB: Team = res;
          TeamB.GoalsAgainst = TeamB.GoalsAgainst - match.GoalsTeamA;
          TeamB.GoalsFor = TeamB.GoalsFor - match.GoalsTeamB;
          if(match.winner == TeamB.Name){
            TeamB.Wins = TeamB.Wins - 1;
          } else if( match.winner == "Tie"){
            TeamB.Ties = TeamB.Ties - 1;
          } else {
            TeamB.Loses = TeamB.Loses - 1;
          }
          TeamB.Games = TeamB.Wins + TeamB.Loses + TeamB.Ties;
          TeamB.GoalsDiff = TeamB.GoalsFor - TeamB.GoalsAgainst;
          TeamB.Points = (TeamB.Wins * 3) + TeamB.Ties;
          this.updateTeam(TeamB).subscribe(
            res => this.openSnackBar(res, 'dismiss'),
            err =>{this.openSnackBar(err.error, 'dismiss');
            console.error(err);
          });
        },
        err => console.error(err)
      );
    }
  }



  matchUpdated(match, oldMatch){
    if(oldMatch.winner != null && oldMatch.winner != undefined){
      this.getTeamByName(oldMatch.TeamA).subscribe(
        res => {
          let TeamA: Team = res;
          TeamA.GoalsAgainst = TeamA.GoalsAgainst - oldMatch.GoalsTeamB;
          TeamA.GoalsFor = TeamA.GoalsFor - oldMatch.GoalsTeamA;
          if(oldMatch.winner == TeamA.Name){
            TeamA.Wins = TeamA.Wins - 1;
          } else if( oldMatch.winner == "Tie"){
            TeamA.Ties = TeamA.Ties - 1;
          } else {
            TeamA.Loses = TeamA.Loses - 1;
          }
          TeamA.Games = TeamA.Wins + TeamA.Loses + TeamA.Ties;
          TeamA.GoalsDiff = TeamA.GoalsFor - TeamA.GoalsAgainst;
          TeamA.Points = (TeamA.Wins * 3) + TeamA.Ties;
          this.updateTeam(TeamA).subscribe(
            res => this.openSnackBar(res, 'dismiss'),
            err =>{this.openSnackBar(err.error, 'dismiss');
            console.error(err);
          });
        },
        err => console.error(err)
      );
      this.getTeamByName(oldMatch.TeamB).subscribe(
        res => {
          let TeamB: Team = res;
          TeamB.GoalsAgainst = TeamB.GoalsAgainst - oldMatch.GoalsTeamA;
          TeamB.GoalsFor = TeamB.GoalsFor - oldMatch.GoalsTeamB;
          if(oldMatch.winner == TeamB.Name){
            TeamB.Wins = TeamB.Wins - 1;
          } else if( oldMatch.winner == "Tie"){
            TeamB.Ties = TeamB.Ties - 1;
          } else {
            TeamB.Loses = TeamB.Loses - 1;
          }
          TeamB.Games = TeamB.Wins + TeamB.Loses + TeamB.Ties;
          TeamB.GoalsDiff = TeamB.GoalsFor - TeamB.GoalsAgainst;
          TeamB.Points = (TeamB.Wins * 3) + TeamB.Ties;
          this.updateTeam(TeamB).subscribe(
            res => {
              this.openSnackBar(res, 'dismiss');
              this.matchAdded(match);
          },
            err =>{this.openSnackBar(err.error, 'dismiss');
            console.error(err);
          });
        },
        err => console.error(err)
      );
    }
  }
}