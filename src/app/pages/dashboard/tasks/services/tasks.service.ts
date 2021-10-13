import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Tasks } from '../../../../shared/model/tasks.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService extends Firestore<Tasks> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe((user) => {
      if (user) {
        this.setCollection(`/users/${user.uid}/tasks`, (ref) =>
          ref.orderBy('done', 'asc').orderBy('title', 'asc')
        );
        this.getAll();
        return;
      }
      this.setCollection(null);
    });
  }
}
