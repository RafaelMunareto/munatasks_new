import { etiqueta } from './../../../core/ngrx/reducers/etiquetas.reducer';

import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

import {
  AddSelectionFase,
  AddSelectionEtiqueta,
} from './../../../core/ngrx/actions/action-types';

@Component({
  selector: 'app-segment-button',
  templateUrl: './segment-button.component.html',
  styleUrls: ['./segment-button.component.scss'],
})
export class SegmentButtonComponent implements OnInit{
  @Input() contador;
  fase = 'home';
  etiqueta = 'etiqueta';
  constructor(
    private navCtrl: NavController,
    private store: Store<any>,
    private router: Router,
  ) {}


  ngOnInit() {

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const url = e.url;
        if (url === '/tasks') {
          this.fase = 'home';
          this.slideChanged(`home`);
        } else if (url === `/tasks/create`) {
          this.slideChanged(`create`);
        } else {
          this.store.pipe(select('selectBox'), take(2)).subscribe((data) => {
            this.fase = data.fase ?? 'home';
            this.etiqueta = data.etiqueta;
            this.slideChanged(this.fase);
          });
        }
      });
  }

  segmentChanged(event) {
    const e = typeof event === 'string' ? event : event.target.value;
    switch (e) {
      case 'home':
        this.navCtrl.navigateBack(['/tasks']);
        break;
      case 'create':
        this.navCtrl.navigateRoot(['/tasks/create']);
        this.slideChanged(`create`);
        break;
      default:
        if(!etiqueta){
          this.store.dispatch(AddSelectionEtiqueta('todos'));
        }
        this.store.dispatch(AddSelectionFase(e));
        this.slideChanged(e);
        this.navCtrl.navigateRoot(['/tasks/list']);
    }
  }

  async slideChanged(fase: string) {
    const el = document.getElementById(`segment-${fase}`);
    await el?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }


}
