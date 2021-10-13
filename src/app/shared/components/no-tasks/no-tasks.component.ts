import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-tasks',
  template: ` <ion-item lines="none" color="warning">{{ msg }}</ion-item> `,
})
export class NoTasksComponent {
  @Input() msg;
}
