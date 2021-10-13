import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'responsaveis',
    loadChildren: () =>
      import('./pages/responsaveis/responsaveis.module').then(
        (m) => m.ResponsaveisPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'etiquetas',
    loadChildren: () =>
      import('./pages/etiquetas/etiquetas.module').then(
        (m) => m.EtiquetasModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
