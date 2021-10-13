import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { EtiquetasComponent } from './etiquetas.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: EtiquetasComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./etiqueta-save/etiqueta-save.module').then(
            (m) => m.EtiquetaSavePageModule
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./etiqueta-save/etiqueta-save.module').then(
            (m) => m.EtiquetaSavePageModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtiquetasRoutingModule {}
