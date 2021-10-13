import { NoTasksComponent } from './no-tasks.component';
import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [NoTasksComponent],
  imports: [SharedModule],
  exports: [NoTasksComponent],
})
export class NoTasksModule {}
