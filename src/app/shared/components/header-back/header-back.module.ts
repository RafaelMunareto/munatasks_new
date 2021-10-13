import { SharedModule } from 'src/app/shared/shared.module';
import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-back',
  template: ` <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button text="Voltar" [defaultHref]="route"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>`,
})
export class HeaderBackComponent {
  @Input() title;
  @Input() route;
}

@NgModule({
  declarations: [HeaderBackComponent],
  imports: [SharedModule],
  exports: [HeaderBackComponent],
})
export class HeaderBackModule {}
