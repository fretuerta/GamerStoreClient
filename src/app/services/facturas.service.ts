import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  baseUrl: string = environment.baseUrl;

  constructor( protected http: HttpClient) { }

  public readFacturas(clienteId: number): Promise<any> {
    return this.http.get(this.baseUrl + 'facturas/' + clienteId).toPromise();
  }

  public downloadFacturaPDF(tipo: string, id: string) {
    return this.http.get(this.baseUrl + 'facturas/pdf/tipo/' + tipo + '/id/' + id, { responseType: 'blob' }).toPromise();
  }

  public deleteFactura(numFra: string){
    return this.http.get(this.baseUrl + 'facturas/delete/' + numFra).toPromise();
  }
}
