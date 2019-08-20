import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeagueTableComponent } from './league-table/league-table.component';
import { LeagueMatchesTableComponent } from './league-matches-table/league-matches-table.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { MatchViewComponent } from './match-view/match-view.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AllPlayersViewComponent } from './all-players-view/all-players-view.component';
import { RegulationsComponent } from './regulations/regulations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopScorerComponent } from './top-scorer/top-scorer.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { TeamAddViewComponent } from './team-add-view/team-add-view.component';
import { MatchAddViewComponent } from './match-add-view/match-add-view.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [{
  path: '',
  children: [ 
    { 
      path: '',
      redirectTo: '/league-table',
      pathMatch: 'full'
    },
    {
      path: 'league-table',
      component: LeagueTableComponent
    },
    {
      path: 'league-matches-table',
      component : LeagueMatchesTableComponent},
    {
      path: 'team-view',
      component: TeamViewComponent
    },
    {
      path: 'team-view/:id',
      component: TeamViewComponent
    },
    {
      path: 'all-players-view',
      component: AllPlayersViewComponent
    },
    {
      path: 'match-view',
      component: MatchViewComponent
    },
    {
      path: 'regulations',
      component: RegulationsComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'top-scorer',
      component: TopScorerComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LeagueTableComponent,
  LeagueMatchesTableComponent,
  TeamViewComponent,
  AllPlayersViewComponent,
  MatchViewComponent,
  RegulationsComponent,
  DashboardComponent,
  TopScorerComponent
]
export const dialogComponents = [
  DialogConfirmationComponent,
  TeamAddViewComponent,
  PlayerViewComponent,
  MatchAddViewComponent,
  LoginComponent,
  DialogComponent
]