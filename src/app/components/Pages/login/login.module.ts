import { Routes, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../../../auth.guard';

import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
