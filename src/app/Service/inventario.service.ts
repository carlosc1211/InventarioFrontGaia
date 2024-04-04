import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private getaAllArticleUrl = 'https://localhost:44357/api/Articulo/GetAllItem';
  private saveArticleUrl = 'https://localhost:44357/api/Articulo/';

  constructor(private http: HttpClient, private router: Router) {}

  getAllArticles(): Observable<any[]> {
  return this.http.get<any[]>(this.getaAllArticleUrl).pipe(
    catchError((error) => {
      console.error('Error al obtener los artículos:', error);
      return throwError('Algo salió mal al obtener los artículos. Por favor, inténtelo de nuevo más tarde.');
    })
  );
}


saveArticle(articulo: any): Observable<any> {
  return this.http.post<any>(this.saveArticleUrl, articulo)
      .pipe(
        catchError(this.handleError) // Manejo de errores opcional
      );
}

private handleError(error: any): Observable<any> {
    console.error('Ocurrió un error:', error);
    return throwError('Algo salió mal. Por favor, inténtelo de nuevo más tarde.');
  }

}
