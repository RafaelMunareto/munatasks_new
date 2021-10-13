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
      class="box-shadown-light pointer"
      style="min-width:10rem"
    >
      <ion-card-content (click)="direct.emit($event)">
        <ion-row class="ion-justify-content-between">
          <div class="flex-column">
            <ion-icon
              [name]="icone"
              slot="start"
              [color]="color"
              class="icon-2em"
            ></ion-icon>
            <ion-label>{{ label }}</ion-label>
          </div>
          <ion-text>
            <h1 class="bold size200">{{ data }}</h1>
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
