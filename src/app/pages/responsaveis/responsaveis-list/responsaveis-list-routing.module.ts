import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponssaveisListPage } from './responsaveis-list.page';

const routes: Routes = [
  {
    path: '',
    component: ResponssaveisListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsibleListPageRoutingModule {}
