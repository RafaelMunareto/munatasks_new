import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Responsavel } from './../../../shared/model/responsavel.model';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelService extends Firestore<Responsavel> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe((user) => {
      if (user) {
        this.setCollection(`/users/${user.uid}/responsavel`, (ref) =>
          ref.orderBy('nome', 'asc')
        );
        return;
      }
      this.setCollection(null);
    });
  }
}
