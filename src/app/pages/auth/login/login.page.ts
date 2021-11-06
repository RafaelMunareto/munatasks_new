/* eslint-disable no-underscore-dangle */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';

import {
  AvailableResult,
  BiometryType,
  NativeBiometric,
} from 'capacitor-native-biometric';
import {
  AddEtiquetas,
  AddResponsavel,
  AddTasks,
} from 'src/app/core/ngrx/actions/action-types';

import { formatDate } from '@angular/common';
import { ErrorPtBr } from './../../../shared/functions/errorPtBr';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { Notifications } from 'src/app/shared/functions/notifications';
import { CurrentPlatformService } from 'src/app/shared/services/current-plataform.service';
import { mustMatch } from 'src/app/shared/validators/validate-password.validator';
import { OverlayService } from '../../../core/services/overlay.service';
import { TasksService } from '../../dashboard/tasks/services/tasks.service';
import { EtiquetasService } from '../../etiquetas/services/etiquetas.service';
import { ResponsavelService } from '../../responsaveis/services/responsavel.service';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Cadastro',
  };
  alert: any[] = [];
  authForm: FormGroup;
  authProviders = AuthProvider;
  digitalChange = false;
  emailStorage = '';
  passStorage = '';
  private _storage: Storage | null = null;

  private nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  private confirmPasswordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    mustMatch('password'),
  ]);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private activeRoute: ActivatedRoute,
    private overlayService: OverlayService,
    public currentPlatformService: CurrentPlatformService,
    private taskService: TasksService,
    private etiquetasService: EtiquetasService,
    private responsavelService: ResponsavelService,
    private store: Store<any>,
    private storage: Storage,
    private nt: Notifications,
    private errorPtBr: ErrorPtBr,
    private bd: AngularFirestore
  ) {
    this.createForm();
  }

  async ngOnInit() {
    await this.init();
    const redirect = this.activeRoute.snapshot.queryParamMap.get('redirect');

    if (this.currentPlatformService.isDevice) {
      await this._storage.get('pass').then((data) => {
        if (data) {
          this.emailStorage = data.email;
          this.passStorage = data.password;
          this.checkCredential();
        }
      });
    }
  }

  get email(): any {
    return this.authForm.get('email').value;
  }

  get password(): any {
    return this.authForm.get('password').value;
  }

  get name(): any {
    return this.authForm.get('name');
  }

  get confirmPassword(): any {
    return this.authForm.get('confirmPassword');
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Cadastro';
    this.configs.actionChange = isSignIn
      ? 'Crie uma conta'
      : 'Já possuo uma conta';
    if (!isSignIn) {
      this.authForm.addControl('name', this.nameControl);
      this.authForm.addControl('confirmPassword', this.confirmPasswordControl);
    } else {
      this.authForm.removeControl('name');
      this.authForm.removeControl('confirmPassword');
    }
  }

  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider,
      });
      this.navCtrl
        .navigateForward(
          this.activeRoute.snapshot.queryParamMap.get('redirect') || '/tasks'
        )
        .then(() => this.callNgrxGet());
    } catch (e) {
      await this.errorPtBr.erro(e);
    } finally {
      await this.set('pass', { email: this.email, password: this.password });
      await this.notificationsAcionar();
      loading.dismiss();
    }
  }

  async setCredential() {
    await this._storage.get('pass').then((res) => {
      NativeBiometric.setCredentials({
        username: res.email,
        password: res.password,
        server: 'https://munatasks.com',
      });
    });
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  deleteCredential() {
    NativeBiometric.deleteCredentials({
      server: 'http://www.munatasks.com',
    }).then(() => {
      this.overlayService.toast({
        message: 'Login e senha deletados!',
      });
    });
  }

  async checkCredential() {
    this.setCredential().then(() => {
      NativeBiometric.isAvailable().then((result: AvailableResult) => {
        const isAvailable = result.isAvailable;
        const isFaceId = result.biometryType === BiometryType.FACE_ID;
        if (isAvailable || isFaceId) {
          NativeBiometric.getCredentials({
            server: 'https://munatasks.com',
          })
            .then(() => {
              NativeBiometric.verifyIdentity({
                reason: '',
                title: 'Log in',
                subtitle: 'MunaTasks',
                description: '',
              })
                .then(() => {
                  this.autenticate(AuthProvider.Email);
                })
                .catch((err) => {
                  this.errorPtBr.erro(err);
                });
            })
            .catch(async (err) => {
              await this.errorPtBr.erro(err);
            });
        }
      });
    });
  }

  notificationsAcionar() {
    const data = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.store.pipe(select('tasks'), take(2)).subscribe((res: any) => {
      this.alert = res.tasks.filter(
        (r: any) =>
          this.convertData(formatDate(r.data, 'yyyy-MM-dd', 'en')) <
            this.convertData(data) && !r.done
      );
      this.nt.simpleNotif(this.alert);
    });
  }

  private async autenticate(provider) {
    const loading = await this.overlayService.loading();
    try {
      this.authService
        .authenticate({
          isSignIn: this.configs.isSignIn,
          user: {
            email: this.emailStorage || this.email,
            password: this.passStorage || this.password,
          },
          provider,
        })
        .then(() => {
          this.navCtrl
            .navigateForward(
              this.activeRoute.snapshot.queryParamMap.get('redirect') ||
                '/tasks'
            )
            .then(() => {
              this.callNgrxGet();
            });
        });
    } catch (e) {
      await this.errorPtBr.erro(e);
    } finally {
      await this.notificationsAcionar();
      loading.dismiss();
    }
  }
  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  private async callNgrxGet() {
    this.etiquetasService.getAll().subscribe((res) => {
      this.store.dispatch(AddEtiquetas(res));
    });

    this.taskService.getAll().subscribe((res: any) => {
      this.store.dispatch(AddTasks(res));
    });

    this.responsavelService.getAll().subscribe((res) => {
      this.store.dispatch(AddResponsavel(res));
    });
  }

  private set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  private convertData(data) {
    const value = new Date(data);

    return value;
  }
}
