import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { HistoryComponent } from './components/history/history.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'deposit',
        component: DepositComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'history',
        component: HistoryComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
