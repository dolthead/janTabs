import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonImg, HttpClientModule, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailPage implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private http: HttpClient = inject(HttpClient);
  private toastController: ToastController = inject(ToastController);

  url = 'https://pokeapi.co/api/v2/pokemon/'; // get everything about ONE pokemon
  pokename: string | null = '';
  pokeDetails: any = undefined;

  constructor() { }

  ngOnInit() {
    // read parameter from URL/route
    this.pokename = this.route.snapshot.paramMap.get('pokename');

    this.http.get<any>(this.url + this.pokename)
      .pipe(take(1))
      .subscribe(pokeData => this.pokeDetails = pokeData);
  }
  avatarButtonStyle = {
    'height': '60vw',
    'width': '60vw',
    'max-height': '200px',
    'max-width': '200px',
    'margin': '0 auto',
    'background-color': 'white',
    'border-radius': '50%',
    'box-shadow': '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3)'
  };

  async clickAvatar(pokeName: string) {
    const toast = await this.toastController.create(
      {
        message: `${pokeName}: "Ouch!"`,
        position: 'top',
        color: 'dark',
        duration: 3000,
      }
    );
    toast.present();
  }


}
