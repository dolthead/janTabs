import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonProgressBar, IonList, IonSearchbar, IonItem, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, RouterLink, HttpClientModule, CommonModule, TitleCasePipe, IonItem, IonSearchbar, IonList, IonProgressBar, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab3Page implements OnInit {

  private http: HttpClient = inject(HttpClient);
  
  constructor() {}

  url = 'https://pokeapi.co/api/v2/pokemon?limit=1000'; // download all 1015!
  list: any[] = [];
  filteredList: any[] = [];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.http.get<any>(this.url)
      .pipe(take(1))
      .subscribe((pokeData:any) => {
        this.list = pokeData.results;
        this.list.sort((a: any, b: any) => a.name > b.name ? 1 : -1);
        this.filteredList = [...this.list];
        this.isLoading = false;
      });
  }

}
