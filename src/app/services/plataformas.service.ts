import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PlataformasService {

  url: string = "http://localhost:8080/GamerStore/";

  constructor( protected http: Http) { }

  public readPlataformas(): Promise<any> {
    return this.http.get(this.url + 'plataformas').toPromise();
  }
  
  public deletePlataforma(id: number): Promise<any> {
    return this.http.delete(this.url + 'plataforma/' + id).toPromise();
  }

  public updatePlataforma(element: any): Promise<any> {
    return this.http.put(this.url + 'plataforma/' + element.id, element ).toPromise();
  }

  public addPlataforma(element: any): Promise<any> {
    let post = { nombre: element.nombre }
    return this.http.post(this.url + 'plataforma', post).toPromise();
  }

}
