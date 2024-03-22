import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'https://localhost:44357/api/Usuario/Login';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
    });

    return this.http.post<any>(this.loginUrl, user, { headers: headers }).pipe(
      tap((response) => console.log(response)),
      catchError(this.handleError<any>('login', [])),
    );
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.status);
      return of(result as T);
    };
  }
}
