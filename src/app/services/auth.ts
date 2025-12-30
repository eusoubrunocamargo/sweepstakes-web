import { User } from '../models/user.model';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable , tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthRequest {
  whatsapp: string;
  name?: string;
  }

export interface OtpVerification {
  whatsapp: string;
  code: string;
  }

export interface TokenResponse extends User {}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  //send sms (post /otp/request)

  requestOtp(whatsapp: string): Observable<any> {
    const formattedNumber = this.formatWhatsapp(whatsapp);
    return this.http.post<any>(`${this.apiUrl}/otp/request`, { whatsapp: formattedNumber});
  }

  //validate code (post /otp/validate) and save session

  validateOtp(whatsapp: string, code: string): Observable<TokenResponse> {
    const formattedNumber = this.formatWhatsapp(whatsapp);
    return this.http.post<TokenResponse>(`${this.apiUrl}/otp/validate`, {
      whatsapp: formattedNumber,
      code
      }).pipe(
        tap(response => this.saveSession(response))
        );
  }


  // helper to format whatsapp num
  private formatWhatsapp(whatsapp: string): string {
    let digits = whatsapp.replace(/\D/g, '');
    if (digits.startsWith('55') && digits.length >= 12){
      return '+' + digits;
    }
    return '+55' + digits;
  }

  // helper to save @ browser
  private saveSession(data: TokenResponse) {
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user_data', JSON.stringify(data));
  }

  // helper to retrieve logged user
  getUser(): User | null {
    const data = localStorage.getItem('user_data');
    return data ? JSON.parse(data) as User : null;
  }

  // check if user is auth
  isAuthenticated(): boolean {
    const user = this.getUser();
    return !!(user && user.token);
  }

  // return JWT
  getToken(): string | null {
    const user = this.getUser();
    return user?.token ?? null;
  }

  // end session -> /login
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    void this.router.navigate(['/login']);
  }


}
