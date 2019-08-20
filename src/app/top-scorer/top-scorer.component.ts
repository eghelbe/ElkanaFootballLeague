import { Component, OnInit } from '@angular/core';
import { Players, ComparePlayerGoals, CompareYellowCards, CompareRedCards } from '../team.model';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-top-scorer',
  templateUrl: './top-scorer.component.html',
  styleUrls: ['./top-scorer.component.css']
})
export class TopScorerComponent implements OnInit {

  public players: Players[];
  public topYellow: Players[];
  public topRed: Players[];

  constructor(public service: LeagueService) { }

  ngOnInit() {
    this.getAllPlayers();
  }

  private getAllPlayers(){
    this.service.getAllPlayers().subscribe(
      res => {
        this.players = res;
        this.players.sort(ComparePlayerGoals);
        this.topYellow = this.players.slice(0);
        this.topRed = this.players.slice(0);
        this.topYellow.sort(CompareYellowCards);
        this.topRed.sort(CompareRedCards);
      },
      err => console.error(err)
    )
  }

  setStyleScorer(position){
    if(position == 0){
      let styles = {
        'font-weight' : 'bold',
        'background-color' : '#eeeeee',
      };
      return styles;
    }
  }
  setStyleYellow(position){
    if(position == 0){
      let styles = {
        'font-weight' : 'bold',
        'background-color' : '#eeeeee',
      };
      return styles;
    }
  }
  setStyleRed(position){
    if(position == 0){
      let styles = {
        'font-weight' : 'bold',
        'background-color' : '#eeeeee',
      };
      return styles;
    }
  }

}
