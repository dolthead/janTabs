import { Component, inject } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonInput, IonCheckbox, IonTabButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { SettingsPage } from '../settings/settings.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonCheckbox, IonInput, IonIcon, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {

  private router: Router = inject(Router);

  constructor(private readonly modalCtrl: ModalController) {
    addIcons({
      settingsOutline,
    });
  }

  async openSettings() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });
    modal.present();
  }

  goToTab2() {
    this.router.navigate(['/tabs/tab2']);
  }
}
