import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  baseUrl: string = environment.baseUrl;

  constructor( protected http: Http) { }

  public readJuegos(): Promise<any> {
    return this.http.get(this.baseUrl + 'juegos').toPromise();
  }

  public deleteJuego(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + 'juego/' + id).toPromise();
  }

  public updateJuego(element: any): Promise<any> {
    return this.http.put(this.baseUrl + 'juego/' + element._id, element ).toPromise();
  }

  public addJuego(element: any): Promise<any> {
    return this.http.post(this.baseUrl + 'juego', element).toPromise();
  }

}
