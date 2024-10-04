import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Badge } from '@awesome-cordova-plugins/badge/ngx';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [FormsModule, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
  providers: [Badge],
})
export class Tab2Page implements OnInit {

  private badge: Badge = inject(Badge);

  public badgeCount = 0;
  
  constructor() {}

  ngOnInit() {  
    this.setBadge();
  }

  async setBadge() {
    const evt = new CustomEvent('badgeCount', { detail: this.badgeCount });
    window.dispatchEvent(evt);
    if (this.badgeCount == 0) {
      await this.badge.clear();
    } else {
      await this.badge.set(this.badgeCount);
    }
  }

  async clearBadge() {
    this.badgeCount = 0;
    this.setBadge();
  }

}
