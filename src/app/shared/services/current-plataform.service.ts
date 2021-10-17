/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { find } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class CurrentPlatformService {

    isDevice: boolean = false;

    constructor(
        private platform: Platform, ) {
          this.setPlatform();
         }

    setPlatform(): void {

        const platforms: string[] = this.platform.platforms();
        const platform: string = find(platforms, (p: string) => {
            return p === 'capacitor';
        });

        this.isDevice = platform ? true : false;
    }


}
