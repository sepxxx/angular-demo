import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
// import {SecondComponent} 

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'second',
    component: TestComponent

  },
  {
    path: '**',
    redirectTo: ''
  },
  // {
  //   path: '',
  //   component:
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
