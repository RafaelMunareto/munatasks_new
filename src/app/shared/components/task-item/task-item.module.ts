import { NgModule } from '@angular/core';

import { TaskItemComponent } from './task-item.component';
import { SharedModule } from '../../shared.module';
import { DirectivesModule } from './../../directives/directives.module';

@NgModule({
  declarations: [TaskItemComponent],
  imports: [SharedModule, DirectivesModule],
  exports: [TaskItemComponent],
})
export class TaskItemModule {}
