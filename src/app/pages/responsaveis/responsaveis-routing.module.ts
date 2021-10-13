import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResponsaveisComponent } from './responsaveis.component';

const routes: Routes = [
  {
    path: '',
    component: ResponsaveisComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        loadChildren: () =>
          import('./responsaveis-save/responsaveis-save.module').then(
            (m) => m.ResponsaveisSavePageModule
          ),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./responsaveis-save/responsaveis-save.module').then(
            (m) => m.ResponsaveisSavePageModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./responsaveis-list/responsaveis-list.module').then(
            (m) => m.ResponsaveisListPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsaveisPageRoutingModule {}
