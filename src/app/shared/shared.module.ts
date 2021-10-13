import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskTiposDirective } from './directives/task-tipos.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  exports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class SharedModule {}
