import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userName = signal('');

  ionViewWillEnter() {
    // Busca o nome salvo no LocalStorage
    const user: any = this.authService.getUser();
    this.userName.set(user ? user.name : 'Visitante');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
