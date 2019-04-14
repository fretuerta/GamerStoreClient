import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { Articulo, Alquiler, Cliente } from '../models';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent implements OnInit {

  articulos: Articulo[];
  articulosToShow: Articulo[] = [];
  articulosAlquilados: Articulo[] = [];

  displayedColumns: string[] = ['juego', 'plataforma', 'formato', 'cantidad',
      'precioAlquiler', 'precioVenta', 'fechaCompra', 'fechaVenta', 'action'];
   
  searchText = '';
  formatos: any[];
  clientes: Cliente[];
  cliente: Cliente;
  alquiler: Alquiler = {};

  constructor(protected articulosService: ArticulosService,
              protected clientesService: ClientesService) { }

  ngOnInit() {
    this.clearAlquiler();
    this.articulosService.readArticulos().then( (articulos) => {
      this.articulos = articulos.json();
      this.updateArticulosToShow();
    });
    this.clientesService.readClientes().then( (clientes) => {
      this.clientes = clientes.json();
    })
  }

  updateArticulosToShow() {
    this.articulosToShow = [];
    this.articulos.forEach(articulo => {
      if (articulo.juego.nombre.toUpperCase().indexOf(this.searchText.toUpperCase()) >= 0) {
        articulo.fechaCompra = articulo.fechaCompra ? new Date(articulo.fechaCompra) : null;
        articulo.fechaVenta = articulo.fechaVenta ?  new Date(articulo.fechaVenta) : null;
        if (!this.articulosAlquilados.includes(articulo)) {
          this.articulosToShow.push(articulo);
        }
      }
    });
  }

  clearSearchText() {
    this.searchText = '';
    this.updateArticulosToShow();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addToAlquilados(articulo: Articulo) {
    this.articulosAlquilados.push(articulo);
    this.updateArticulosToShow();
  }

  removeFromAlquilados(articulo: Articulo) {
    this.articulosAlquilados = this.articulosAlquilados.filter(element => element.id != articulo.id);
    this.updateArticulosToShow();
  }

  saveAlquiler() {
    console.log('cliente: ', this.cliente)
  }

  clearAlquiler() {
    this.alquiler = {
      id: null,
      articulo: null,
      cliente: null,
      fechaInicio: null,
      fechaFin: null
    }
  }

}
