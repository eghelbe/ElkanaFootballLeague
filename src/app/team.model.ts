import { Time } from '@angular/common';
import { Player } from '@angular/core/src/render3/interfaces/player';

export interface Team {
  Position: number,
  Name: string,
  Games: number,
  Wins: number,
  Loses: number,
  Ties: number,
  GoalsAgainst: number,
  GoalsFor: number,
  GoalsDiff: number,
  Points: number,
  CreationDate: undefined
}

export interface Players {
  FirstName: string,
  LastName: string,
  TeamName: string,
  TShirtNumber: number,
  Goals: number,
  RedCards: number,
  YellowCards: number,
  Phone: string,
  Coordinator: boolean,
  CreationDate: undefined
}

export interface Match {
  TeamA: string,
  TeamB: string,
  Day: string,
  Time: Time,
  Date: Date,
  GoalsTeamA: number,
  GoalsTeamB: number,
  Comment: string,
  matchName: number,
  winner: string,
  CreationDate: undefined
}

export enum weekDay {
  'ראשון',
  'שני',
  'שלישי',
  'רביעי',
  'חמישי',
  'שישי',
  'מוצ"ש'
}

export function ComparePoints( a:Team, b:Team ) {
  if ( a.Points < b.Points ){
    return 1;
  }
  if ( a.Points > b.Points ){
    return -1;
  }
  return 0;
}

export function CompareGoals( a:Team, b:Team ) {
  if ( a.GoalsDiff < b.GoalsDiff ){
    return 1;
  }
  if ( a.GoalsDiff > b.GoalsDiff ){
    return -1;
  }
  return 0;
}

export function ComparePlayerGoals(a: Players, b: Players) {
  if ( a.Goals < b.Goals ){
    return 1;
  }
  if ( a.Goals > b.Goals ){
    return -1;
  }
  return 0;
}

export function CompareYellowCards(a: Players, b: Players) {
  if ( a.YellowCards < b.YellowCards ){
    return 1;
  }
  if ( a.YellowCards > b.YellowCards ){
    return -1;
  }
  return 0;
}

export function CompareRedCards(a: Players, b: Players) {
  if ( a.RedCards < b.RedCards ){
    return 1;
  }
  if ( a.RedCards > b.RedCards ){
    return -1;
  }
  return 0;
}