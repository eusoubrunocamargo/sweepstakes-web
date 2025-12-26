import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent {

  private userService = inject(UserService);

  private authService = inject(AuthService);

  private router = inject(Router);

  name = '';

  isLoading = false;

  async onSave() {

    if(!this.name || this.name.length < 3) return;

    this.isLoading = true;

    const user: any = this.authService.getUser();

    if (!user || !user.userId) {

      alert('Error: Unidentified user. Login again.');

      this.router.navigate(['/login']);

      return;

      }

    this.userService.updateName (user.userId, this.name).subscribe({

      next: () => {

        this.isLoading = false;

        user.name = this.name;

        user.isNewUser = false;

        localStorage.setItem('user_data', JSON.stringify(user));

        this.router.navigate(['/home']);

        },

      error: (err) => {

        console.log(err);

        this.isLoading = false;

        alert('Error saving profile.');

        }
      });
    }
}
