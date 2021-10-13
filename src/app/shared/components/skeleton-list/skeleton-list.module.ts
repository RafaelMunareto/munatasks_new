import { SkeletonListComponent } from './skeleton-list.component';
import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SkeletonListComponent],
  imports: [SharedModule],
  exports: [SkeletonListComponent],
})
export class SkeletonListModule {}
