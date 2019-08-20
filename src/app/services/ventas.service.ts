import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  baseUrl: string = environment.baseUrl;

  constructor( protected http: HttpClient) { }

  public readVentas(): Promise<any> {
    return this.http.get(this.baseUrl + 'ventas').toPromise();
  }

  public deleteVenta(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + 'venta/' + id).toPromise();
  }

  public updateVenta(venta: Venta): Promise<any> {
    return this.http.put(this.baseUrl + 'venta/' + venta.id, venta ).toPromise();
  }

  public addVenta(venta: any): Promise<any> {
    return this.http.post(this.baseUrl + 'venta', venta).toPromise();
  }
}
