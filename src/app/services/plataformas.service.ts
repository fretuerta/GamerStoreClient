import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlataformasService {

  baseUrl: string = environment.baseUrl;

  constructor( protected http: Http) { }

  public readPlataformas(): Promise<any> {
    return this.http.get(this.baseUrl + 'plataformas').toPromise();
  }
  
  public deletePlataforma(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + 'plataforma/' + id).toPromise();
  }

  public updatePlataforma(element: any): Promise<any> {
    return this.http.put(this.baseUrl + 'plataforma/' + element.id, element ).toPromise();
  }

  public addPlataforma(element: any): Promise<any> {
    let post = { nombre: element.nombre }
    return this.http.post(this.baseUrl + 'plataforma', post).toPromise();
  }

}
