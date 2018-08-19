import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  baseUrl: string = environment.baseUrl;

  constructor( protected http: Http) { }

  public readArticulos(): Promise<any> {
    return this.http.get(this.baseUrl + 'articulos').toPromise();
  }

  public deleteArticulo(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + 'articulo/' + id).toPromise();
  }

  public updateArticulo(element: any): Promise<any> {
    return this.http.put(this.baseUrl + 'articulo/' + element.id, element ).toPromise();
  }

  public addArticulo(element: any): Promise<any> {
    return this.http.post(this.baseUrl + 'articulo', element).toPromise();
  }
}
