import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TrendsComponent } from './pages/trends/trends.component';

const routes: Routes = [
  { path: 'login'   , component: LoginComponent },
  { path: 'home'    , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'trend/:id'   , component: TrendsComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
