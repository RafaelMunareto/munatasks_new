import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SegmentButtonModule } from './segment-button/segment-button.module';
import { EtiquetaItemModule } from './etiqueta-item/etiqueta-item.module';
import { TaskItemModule } from './task-item/task-item.module';
import { MenuToggleModule } from './menu-toggle/menu-toggle.module';
import { ValidatorNoteModule } from './validator-note/validator-note.module';
import { LogoutButtonModule } from './logout-button/logout-button.module';
import { InputIconValidModule } from './input-icon-valid/input-icon-valid.module';
import { CardIconeContadorModule } from './card-icone-contador/card-icone-contador.module';
import { HeaderBackModule } from './header-back/header-back.module';
import { ResponsaveisItemModule } from './responsaveis-item/responsaveis-item.module';
import { SkeletonListModule } from './skeleton-list/skeleton-list.module';
import { NoTasksModule } from './no-tasks/no-tasks.module';

@NgModule({
  imports: [
    TaskItemModule,
    MenuToggleModule,
    LogoutButtonModule,
    ValidatorNoteModule,
    InputIconValidModule,
    CardIconeContadorModule,
    HeaderBackModule,
    Ng2SearchPipeModule,
    EtiquetaItemModule,
    ResponsaveisItemModule,
    SegmentButtonModule,
    SkeletonListModule,
    NoTasksModule
  ],
  exports: [
    TaskItemModule,
    MenuToggleModule,
    LogoutButtonModule,
    ValidatorNoteModule,
    InputIconValidModule,
    CardIconeContadorModule,
    HeaderBackModule,
    Ng2SearchPipeModule,
    EtiquetaItemModule,
    ResponsaveisItemModule,
    SegmentButtonModule,
    SkeletonListModule,
    NoTasksModule
  ],
})
export class ComponentsModule {}
