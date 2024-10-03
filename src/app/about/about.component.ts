import { Component, OnInit } from '@angular/core';
import { IonButton, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [IonList, IonButton ],
  standalone: true,
})
export class AboutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
