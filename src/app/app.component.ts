import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { CurrentPlatformService } from './shared/services/current-plataform.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { first, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  pages: { url: string; direction: any; icon: string; text: string }[];
  user: firebase.default.User;
  versaoAtual = environment.versao;
  versao;

  constructor(
    private authService: AuthService,
    private firebase: AngularFirestore,
    public currentPlatformService: CurrentPlatformService
  ) {

    this.initializeApp();
  }

  initializeApp() {

    this.firebase.collection('atualizacao')
    .valueChanges()
    .pipe(map((r: any) => r[0].versao))
    .subscribe((res: any) => {
      this.versao = res;
      console.log(this.versaoAtual, res);
    });

    this.authService.authState$.subscribe((user) => {
      this.user = user;
    });

    this.pages = [
      {
        url: '/tasks',
        icon: 'home-outline',
        direction: 'back',
        text: 'Home',
      },
      {
        url: '/responsaveis',
        icon: 'man-outline',
        direction: 'forward',
        text: 'Responsáveis',
      },
      {
        url: '/etiquetas/create',
        icon: 'add-circle-outline',
        direction: 'forward',
        text: 'Nova Etiqueta',
      },
      {
        url: '/responsaveis/create',
        icon: 'add-circle-outline',
        direction: 'forward',
        text: 'Novo Responsável',
      },
      {
        url: '/tasks/create',
        icon: 'add',
        direction: 'forward',
        text: 'Nova Tarefa',
      },
    ];
  }


}
