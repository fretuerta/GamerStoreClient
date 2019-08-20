import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alquiler } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {

  baseUrl: string = environment.baseUrl;

  constructor( protected http: HttpClient) { }

  public readAlquileres(): Promise<any> {
    return this.http.get(this.baseUrl + 'alquileres').toPromise();
  }

  public deleteAlquiler(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + 'alquiler/' + id).toPromise();
  }

  public updateAlquiler(alquiler: Alquiler): Promise<any> {
    return this.http.put(this.baseUrl + 'alquiler/' + alquiler.id, alquiler ).toPromise();
  }

  public addAlquiler(alquiler: any): Promise<any> {
    return this.http.post(this.baseUrl + 'alquiler', alquiler).toPromise();
  }
}
