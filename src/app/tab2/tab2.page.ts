import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput, IonImg } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Badge } from '@awesome-cordova-plugins/badge/ngx';
import { FormsModule } from '@angular/forms';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType, ImageOptions } from '@capacitor/camera';
import { TextToSpeechAdvanced } from '@awesome-cordova-plugins/text-to-speech-advanced/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonImg, 
    FormsModule,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
  providers: [Badge, TextToSpeechAdvanced],
})
export class Tab2Page implements OnInit {
  private badge: Badge = inject(Badge);
  private speech: TextToSpeechAdvanced = inject(TextToSpeechAdvanced);
  private platform: Platform = inject(Platform);

  public badgeCount = 0;
  public rate = 0.5;
  public pitch = 0.5;
  public photoSource: string | undefined = '';
  public text = 'Hello, M Tech!';

  constructor() {}

  ngOnInit() {
    this.setBadge();
  }

  speakWithOptions() {
    this.speech.speak({
      text: this.text || "I don't know what to say",
      identifier: 'com.apple.ttsbundle.Samantha-compact',
      rate: this.rate,
      pitch: this.pitch,
      cancel: true
    });
  }

  async setBadge() {
    const evt = new CustomEvent('badgeCount', { detail: this.badgeCount });
    window.dispatchEvent(evt);
    // use cordova plugin for native devices
    if (this.platform.is('capacitor')) {
      if (this.badgeCount == 0) {
        await this.badge.clear();
      } else {
        await this.badge.set(this.badgeCount);
      }
    } else { // use web API for web
      if (navigator.setAppBadge) {
        if (this.badgeCount == 0) {
          navigator.clearAppBadge();
        } else {
        // Display the number of unread messages.
          navigator.setAppBadge(this.badgeCount);
        }
      }
    }
  }

  async clearBadge() {
    this.badgeCount = 0;
    this.setBadge();
  }

  async shareText() {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }

  async sharePhoto() {
    const options: any = {
      quality: 30,
      allowEditing: true,
      resultType: CameraResultType.Uri
    };
    const photo = await Camera.getPhoto(options);
    this.photoSource = photo.webPath;
    await Share.share({
      title: 'Check out this photo!',
      url: photo.path,
      text: 'Check out this photo I took!',
    });
  }
}
