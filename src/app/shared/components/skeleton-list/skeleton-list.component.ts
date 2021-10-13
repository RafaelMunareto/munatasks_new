import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-list',
  template: `
    <div class="ion-padding custom-skeleton">
      <ion-skeleton-text
        *ngFor="let item of [].constructor(qtd); let i = index"
        animated
        ng-repeat="n in range(5,15)"
        [style]="'height: ' + heigth + '; border-radius:10px'"
      ></ion-skeleton-text>
    </div>
  `,
})
export class SkeletonListComponent {
  @Input() qtd = 10;
  @Input() heigth = '3rem';
}
