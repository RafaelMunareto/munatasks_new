import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutButtonPage } from './logout-button.component';

const routes: Routes = [
  {
    path: '',
    component: LogoutButtonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutButtonPageRoutingModule {}
