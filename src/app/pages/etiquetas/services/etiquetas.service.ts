import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Etiqueta } from './../../../shared/model/etiquetas.model';

@Injectable({
  providedIn: 'root',
})
export class EtiquetasService extends Firestore<Etiqueta> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe((user) => {
      if (user) {
        this.setCollection(`/users/${user.uid}/etiqueta`, (ref) =>
          ref.orderBy('nome', 'asc')
        );
        return;
      }
      this.setCollection(null);
    });
  }
}
