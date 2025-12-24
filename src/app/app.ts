import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet], // <--- Importante para o HTML funcionar
})
export class AppComponent {
  constructor() {}
}
