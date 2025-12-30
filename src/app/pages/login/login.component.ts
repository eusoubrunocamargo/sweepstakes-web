import { Component, inject, signal } from '@angular/core';
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

  currentStep = signal<'PHONE' | 'OTP'>('PHONE');
  isLoading = signal(false);

  // form data

  whatsapp = signal('');
  otpCode = signal('');

  // 1. ask for otpCode

  onRequestOtp() {

    if (!this.whatsapp()) return;

    this.isLoading.set(true);

    this.authService.requestOtp(this.whatsapp()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.currentStep.set('OTP');
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        alert('Connecting Error. Verify backend on PORT 8080');
      }
    });
  }

  // 2. validate otpCode

  onValidateOtp() {

    if (!this.otpCode()) return;
    this.isLoading.set(true);

    this.authService.validateOtp(this.whatsapp(), this.otpCode()).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        if (response.isNewUser) {
          this.router.navigate(['/complete-profile']);
          } else {
            this.router.navigate(['/home']);
          }
        },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        alert('Invalid/Expired code');
        }
      });

    }
  }
