import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../Shared/model/usuarioModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'https://localhost:44357/api/Usuario/Login';
  private usuariosUrl = 'https://localhost:44357/api/Usuario/GetAllUsers';
  private rolesUrl = 'https://localhost:44357/api/Usuario/GetAllRoles';
  private putUsuarioUrl = 'https://localhost:44357/api/Usuario/PutUsuarios';
  private postUsuarioUrl = 'https://localhost:44357/api/Usuario/';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
    });

    return this.http.post<any>(this.loginUrl, user, { headers: headers }).pipe(
      tap((response) => console.log(response)),
      catchError(this.handleError<any>('login', [])),
    );
  }

  saveUsuario(usuario: any): Observable<any> {
    return this.http
      .post<any>(this.postUsuarioUrl, usuario)
      .pipe(catchError(this.handleError<any>('login', [])));
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http
      .put<Usuario>(this.putUsuarioUrl, usuario)
      .pipe(catchError(this.handleError<any>('/login', [])));
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  obtenerUsuarios(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.usuariosUrl, { headers: headers }).pipe(
      tap((response) => console.log(response)),
      catchError(this.handleError<any>('/login', [])),
    );
  }

  obtenerRoles(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.rolesUrl, { headers: headers }).pipe(
      tap((response) => console.log(response)),
      catchError(this.handleError<any>('/login', [])),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.status);
      return of(result as T);
    };
  }
}
