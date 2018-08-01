import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  url: string = "http://localhost:8080/GamerStore/";

  constructor( protected http: Http) { }

  public readArticulos(): Promise<any> {
    return this.http.get(this.url + 'articulos').toPromise();
  }
  
  public deleteArticulo(id: number): Promise<any> {
    return this.http.delete(this.url + 'articulo/' + id).toPromise();
  }

  public updateArticulo(element: any): Promise<any> {
    return this.http.put(this.url + 'articulo/' + element.id, element ).toPromise();
  }

  public addArticulo(element: any): Promise<any> {
    return this.http.post(this.url + 'articulo', element).toPromise();
  }
}
