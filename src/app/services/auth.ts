import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , tap } from 'rxjs';

export interface AuthRequest {
  whatsapp: string;
  name?: string;
  }

export interface OtpVerification {
  whatsapp: string;
  code: string;
  }

export interface TokenResponse {
  token: string;
  userId: string;
  name: string;
  isNewUser: boolean;
  }

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/v1/auth';

  constructor() { }

  //send sms (post /otp/request)

  requestOtp(whatsapp: string): Observable<any> {
    const cleanNumber = whatsapp.replace(/\D/g, '');
    return this.http.post<any>(`${this.apiUrl}/otp/request`, { whatsapp: cleanNumber});
    }

  //validate code (post /otp/validate) and save session

  validateOtp(whatsapp: string, code: string): Observable<TokenResponse> {
    const cleanNumber = whatsapp.replace(/\D/g, '');
    return this.http.post<TokenResponse>(`${this.apiUrl}/otp/validate`, {
      whatsapp: cleanNumber,
      code
      }).pipe(
        tap(response => this.saveSession(response))
        );
    }

  // helper to save @ browser

  private saveSession(data: TokenResponse) {
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user_data', JSON.stringify(data));

    }

  // helper to retrieve logged user

  getUser() {
    const data = localStorage.getItem('user_data');
    return data ? JSON.parse(data) : null;

    }
}
