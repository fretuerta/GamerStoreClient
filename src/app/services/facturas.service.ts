import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Alquiler } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  baseUrl: string = environment.baseUrl;

  constructor( protected http: Http) { }

  public readFacturas(clienteId: number): Promise<any> {
    return this.http.get(this.baseUrl + 'facturas/' + clienteId).toPromise();
  }

}
