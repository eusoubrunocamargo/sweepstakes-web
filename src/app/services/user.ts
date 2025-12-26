import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/v1/users';

  updateName(userId: string, name: string): Observable<void> {

    return this.http.put<void>(`${this.apiUrl}/${userId}`, { name });

    }

}
