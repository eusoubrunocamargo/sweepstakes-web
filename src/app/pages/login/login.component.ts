import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [CommonModule, FormsModule, IonicModule],

  templateUrl: './login.component.html',

  })

export class LoginComponent {

  private authService = inject(AuthService);

  private router = inject(Router);

  // screen states

  currentStep: 'PHONE' | 'OTP' = 'PHONE';

  isLoading = false;

  // form data

  whatsapp = '';

  otpCode = '';

  // 1. ask for otpCode

  onRequestOtp() {

    if (!this.whatsapp) return;

    this.isLoading = true;

    this.authService.requestOtp(this.whatsapp).subscribe({

      next: () => {

        this.isLoading = false;

        this.currentStep = 'OTP';

        },

      error: (err) => {

        console.error(err);

        this.isLoading = false;

        alert('Connecting Error. Verify backend on PORT 8080')
        }
      });
    }

  // 2. validate otpCode

  onValidateOtp() {

    if (!this.otpCode) return;

    this.isLoading = true;

    this.authService.validateOtp(this.whatsapp, this.otpCode).subscribe({

      next: (response) => {

        this.isLoading = false;

        if (response.isNewUser) {

          console.log('New user -> redirect to fill profile');

          //this.router.navigate(['/complete-profile']);

          } else {

            console.log('Existing user -> redirect Home');

            //this.router.navigate(['/home']);

          }

        alert(`Success! Token received.`);

        },

      error: (err) => {

        console.error(err);

        this.isLoading = false;

        alert('Invalid/Expired code');

        }

      });

    }
  }
