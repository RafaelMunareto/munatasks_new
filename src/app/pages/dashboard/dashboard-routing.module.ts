import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./tasks/task-save/task-save.module').then(
            (m) => m.TaskSavePageModule
          ),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./tasks/task-save/task-save.module').then(
            (m) => m.TaskSavePageModule
          ),
      },

      {
        path: 'list',
        loadChildren: () =>
          import('./tasks/tasks-list/tasks-list.module').then(
            (m) => m.TasksListPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
