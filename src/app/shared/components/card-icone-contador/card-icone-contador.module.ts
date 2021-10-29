import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-card-icone-contador',
  template: `
    <ion-card
      id="ion-card"
      class="box-shadown-light pointer w100 padding03"
    >
      <ion-card-content style='padding-left: 0.3rem; padding-right: 0.3rem' (click)="direct.emit($event)">
        <ion-row class="ion-justify-content-between">
          <div class="flex-column">
            <ion-icon
              [name]="icone"
              slot="start"
              [color]="color"
              class="icon-2em"
            ></ion-icon>
            <ion-label class='size90'>{{ label }}</ion-label>
          </div>
          <ion-text>
            <h1 class="bold size150">{{ data }}</h1>
          </ion-text>
        </ion-row>
      </ion-card-content>
    </ion-card>
  `,
  styleUrls: ['./card-icone-contador.scss'],
})
export class CardIconeContadorComponent {
  @Input() data = 0;
  @Input() label;
  @Input() icone;
  @Input() color;
  @Output() direct = new EventEmitter<any>();
}

@NgModule({
  declarations: [CardIconeContadorComponent],
  imports: [SharedModule],
  exports: [CardIconeContadorComponent],
})
export class CardIconeContadorModule {}
