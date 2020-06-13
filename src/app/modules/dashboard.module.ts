import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatRadioModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarModule } from 'ngx-avatar';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { GeneralModalComponent } from '../modal/general-modal/general-modal.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardSidebarComponent } from '../components/dashboard-sidebar/dashboard-sidebar.component';
import { HomeComponent } from '../components/home/home.component';
import { DepositComponent } from '../components/deposit/deposit.component';
import { WithdrawalComponent } from '../components/withdrawal/withdrawal.component';
import { HistoryComponent } from '../components/history/history.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepositModalComponent } from '../components/deposit/deposit-modal/deposit-modal.component';
import { WithdrawalModalComponent } from '../components/withdrawal/withdrawal-modal/withdrawal-modal.component';

@NgModule({
  entryComponents: [
    GeneralModalComponent,
    DepositModalComponent,
    WithdrawalModalComponent
  ],
  declarations: [
    DashboardComponent,
    GeneralModalComponent,
    DashboardSidebarComponent,
    HomeComponent,
    DepositComponent,
    WithdrawalComponent,
    HistoryComponent,
    ProfileComponent,
    DepositModalComponent,
    WithdrawalModalComponent
  ],
  imports: [
    FlexLayoutModule,
    AvatarModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    GeneralModalComponent,
    DashboardSidebarComponent,
    HomeComponent,
    DepositComponent,
    WithdrawalComponent,
    HistoryComponent,
    ProfileComponent,
    DepositModalComponent,
    WithdrawalModalComponent
  ]
})
export class DashboardModule {}
