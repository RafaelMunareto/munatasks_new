import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { IonicStorageModule } from '@ionic/storage-angular';

import { HttpClientModule } from '@angular/common/http';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { CacheModule } from 'ionic-cache';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule,
    CacheModule.forRoot(),
  ],
  exports: [BrowserModule, IonicModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppVersion,
  ],
})
export class CoreModule {}
