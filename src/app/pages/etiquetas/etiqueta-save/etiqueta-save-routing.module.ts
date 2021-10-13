import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtiquetaSavePage } from './etiqueta-save.page';

const routes: Routes = [
  {
    path: '',
    component: EtiquetaSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtiquetaSavePageRoutingModule {}
