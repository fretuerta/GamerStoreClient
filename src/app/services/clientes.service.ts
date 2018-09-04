import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  baseUrl: string = environment.baseUrl;

  constructor( protected http: Http) { }

  public readClientes(): Promise<any> {
    return this.http.get(this.baseUrl + 'clientes').toPromise();
  }

  public deleteCliente(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + 'cliente/' + id).toPromise();
  }

  public updateCliente(element: any): Promise<any> {
    return this.http.put(this.baseUrl + 'cliente/' + element._id, element ).toPromise();
  }

  public addCliente(element: any): Promise<any> {
    return this.http.post(this.baseUrl + 'cliente', element).toPromise();
  }

}
