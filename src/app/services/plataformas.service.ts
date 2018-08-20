import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Plataforma } from '../models';

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
    return this.http.put(this.baseUrl + 'plataforma/' + element._id, element ).toPromise();
  }

  public addPlataforma(element: any): Promise<any> {
    const post = { nombre: element.nombre };
    return this.http.post(this.baseUrl + 'plataforma', post).toPromise();
  }

}
