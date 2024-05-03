import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Articulo } from '../Shared/model/articuloModel';
import { ArticuloReserva } from '../Shared/model/articuloReserva';
import { ClientModel } from '../Shared/model/clientModel';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private getaAllArticleUrl = 'https://localhost:44357/api/articulo/GetAllItem';
  private putArticleUrl = 'https://localhost:44357/api/articulo/PutArticle/';
  private getDetailArticleUrl =
    'https://localhost:44357/api/Articulo/GetDetailItem';
  private deteleArticleUrl = 'https://localhost:44357/api/articulo/deleteItem';
  private saveArticleUrl = 'https://localhost:44357/api/articulo/';
  private saveArticleReservedUrl =
    'https://localhost:44357/api/articulo/ArticuloReserva/';
  private putArticleReservedUrl =
    'https://localhost:44357/api/articulo/PutArticleReserved/';
  private saveClientUrl = 'https://localhost:44357/api/client';
  private getListClientUrl = 'https://localhost:44357/api/client/GetAllClient';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getAllArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.getaAllArticleUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener los artículos:', error);
        return throwError(
          'Algo salió mal al obtener los artículos. Por favor, inténtelo de nuevo más tarde.',
        );
      }),
    );
  }

  getDetailArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.getDetailArticleUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener el detalle de los artículos:', error);
        return throwError(
          'Algo salió mal al obtener los artículos. Por favor, inténtelo de nuevo más tarde.',
        );
      }),
    );
  }

  actualizarProducto(producto: Articulo): Observable<Articulo> {
    return this.http
      .put<Articulo>(this.putArticleUrl, producto)
      .pipe(catchError(this.handleError));
  }

  actualizarArticuloReserva(
    articulo: ArticuloReserva,
  ): Observable<ArticuloReserva> {
    return this.http
      .put<ArticuloReserva>(this.putArticleReservedUrl, articulo)
      .pipe(catchError(this.handleError));
  }

  saveArticle(articulo: any): Observable<any> {
    return this.http.post<any>(this.saveArticleUrl, articulo).pipe(
      catchError(this.handleError), // Manejo de errores opcional
    );
  }

  saveArticleReserved(articuloReserved: ArticuloReserva): Observable<any> {
    return this.http
      .post<any>(this.saveArticleReservedUrl, articuloReserved)
      .pipe(
        catchError(this.handleError), // Manejo de errores opcional
      );
  }

  saveClient(client: ClientModel): Observable<any> {
    return this.http.post<any>(this.saveClientUrl, client).pipe(
      catchError(this.handleError), // Manejo de errores opcional
    );
  }

  getListClient(): Observable<any[]> {
    return this.http.get<any[]>(this.getListClientUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener el detalle de los artículos:', error);
        return throwError(
          'Algo salió mal al obtener los clientes. Por favor, inténtelo de nuevo más tarde.',
        );
      }),
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Ocurrió un error:', error);
    return throwError(
      'Algo salió mal. Por favor, inténtelo de nuevo más tarde.',
    );
  }
}
