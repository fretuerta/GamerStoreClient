import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Juego } from '../models';

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

  public updateJuego(juego: Juego): Promise<any> {
    return this.http.put(this.baseUrl + 'juego/' + juego.id, juego ).toPromise();
  }

  public addJuego(juego: Juego): Promise<any> {
    return this.http.post(this.baseUrl + 'juego', juego).toPromise();
  }

}
