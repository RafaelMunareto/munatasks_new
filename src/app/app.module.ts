import { ResponsavelService } from './pages/responsaveis/services/responsavel.service';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { taskReducer } from './core/ngrx/reducers/tasks.reducer';
import { TasksService } from './pages/dashboard/tasks/services/tasks.service';
import { EtiquetasService } from './pages/etiquetas/services/etiquetas.service';
import { etiquetasReducer } from './core/ngrx/reducers/etiquetas.reducer';
import { responsaveisReducer } from './core/ngrx/reducers/responsaveis.reducer';
import { selectionReducer } from './core/ngrx/reducers/selection.reducer';
import { AlertController } from '@ionic/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {
        tasks: taskReducer,
        etiquetas: etiquetasReducer,
        responsaveis: responsaveisReducer,
        selectBox: selectionReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
  ],
  providers: [
    TasksService,
    EtiquetasService,
    ResponsavelService,
    LocalNotifications,
    AlertController
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
