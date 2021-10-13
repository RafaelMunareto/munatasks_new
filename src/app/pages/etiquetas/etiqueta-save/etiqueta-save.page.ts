import {
  AddEtiquetas,
  ClearEtiquetas,
} from './../../../core/ngrx/actions/action-types';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { OverlayService } from './../../../core/services/overlay.service';
import { EtiquetasService } from '../services/etiquetas.service';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './etiqueta-save.page.html',
  styleUrls: ['./etiqueta-save.page.scss'],
})
export class EtiquetaSavePage implements OnInit {
  pageTitle = '...';
  etiquetaForm: FormGroup;
  etiquetaId: string = undefined;
  fase;

  constructor(
    private fb: FormBuilder,
    private etiquetaService: EtiquetasService,
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
    const etiquetaId = this.route.snapshot.paramMap.get('id');
    if (!etiquetaId) {
      this.pageTitle = 'Criar Etiqueta';
      return;
    }
    this.etiquetaId = etiquetaId;
    this.pageTitle = 'Editar Etiqueta';
    this.etiquetaService
      .get(etiquetaId)
      .pipe(take(1))
      .subscribe(({ nome, cor }) => {
        this.etiquetaForm.get('nome').setValue(nome);
        this.etiquetaForm.get('cor').setValue(cor);
      });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Salvando ...',
    });
    try {
      const etiqueta = !this.etiquetaId
        ? await this.etiquetaService.create(this.etiquetaForm.value)
        : await this.etiquetaService.update({
            id: this.etiquetaId,
            ...this.etiquetaForm.value,
          });
      this.store.dispatch(AddEtiquetas([etiqueta]));
      this.etiquetaForm.reset();
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
    return this.etiquetaForm.get('nome');
  }

  private createForm() {
    this.etiquetaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cor: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
