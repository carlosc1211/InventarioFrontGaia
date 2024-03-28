import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private inventarioUrl = 'https://localhost:44357/api/Articulo/GetAllItem';

  constructor(private http: HttpClient, private router: Router) {}

  getAllArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.inventarioUrl);
  }
}
