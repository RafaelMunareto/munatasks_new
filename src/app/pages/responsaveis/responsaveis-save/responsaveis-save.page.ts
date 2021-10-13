import { AddResponsavel } from './../../../core/ngrx/actions/action-types';
import { ResponsavelService } from '../services/responsavel.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-responsaveis-save',
  templateUrl: './responsaveis-save.page.html',
  styleUrls: ['./responsaveis-save.page.scss'],
})
export class ResponsaveisSavePage implements OnInit {
  pageTitle = '...';
  responsavelForm: FormGroup;
  responsavelId: string = undefined;
  fase;

  constructor(
    private fb: FormBuilder,
    private responsavelService: ResponsavelService,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ionViewDidEnter() {
    this.init();
  }

  init(): void {
    const responsavelId = this.route.snapshot.paramMap.get('id');
    if (!responsavelId) {
      this.pageTitle = 'Criar Responsável';
      return;
    }
    this.responsavelId = responsavelId;
    this.pageTitle = 'Editar Responsável';
    this.responsavelService
      .get(responsavelId)
      .pipe(take(1))
      .subscribe(({ nome }) => {
        this.responsavelForm.get('nome').setValue(nome);
      });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Salvando ...',
    });
    try {
      const responsavel = !this.responsavelId
        ? await this.responsavelService.create(this.responsavelForm.value)
        : await this.responsavelService.update({
            id: this.responsavelId,
            ...this.responsavelForm.value,
          });
      this.store.dispatch(AddResponsavel([responsavel]));
      this.responsavelForm.reset();
      this.navCtrl.back();
    } catch (error) {
      await this.overlayService.toast({
        message: error.message,
      });
    } finally {
      loading.dismiss();
    }
  }

  get nome(): any {
    return this.responsavelForm.get('nome');
  }

  private createForm() {
    this.responsavelForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
