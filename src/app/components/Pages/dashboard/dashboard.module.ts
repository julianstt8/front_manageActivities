import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../../../auth.guard';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'Login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
