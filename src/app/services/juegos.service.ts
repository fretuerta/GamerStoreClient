import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  url: string = "http://localhost:8080/GamerStore/";

  constructor( protected http: Http) { }

  public readJuegos(): Promise<any> {
    return this.http.get(this.url + 'juegos').toPromise();
  }
  
  public deleteJuego(id: number): Promise<any> {
    return this.http.delete(this.url + 'juego/' + id).toPromise();
  }

  public updateJuego(element: any): Promise<any> {
    return this.http.put(this.url + 'juego/' + element.id, element ).toPromise();
  }

  public addJuego(element: any): Promise<any> {
    return this.http.post(this.url + 'juego', element).toPromise();
  }

}
