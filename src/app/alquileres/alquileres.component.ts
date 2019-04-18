import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { Articulo, Alquiler, Cliente, AlquilerDetalle } from '../models';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ClientesService } from '../services/clientes.service';
import { AlquileresService } from '../services/alquileres.service';

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
              protected clientesService: ClientesService,
              protected alquileresService: AlquileresService) { }

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
    this.showClientError = !this.cliente;
    if (this.cliente) {
      this.alquiler.cliente = this.cliente;
      this.alquiler.alquilerDetalles = [];
      this.articulosAlquilados.forEach((element)=>{
        let alquilerDetalle: AlquilerDetalle = {
          articulo: element,
          cantidad: 5,
          precio: 3.23
        }
        this.alquiler.alquilerDetalles.push(alquilerDetalle);
      })
      this.alquileresService.addAlquiler(this.alquiler).then((result)=>{
        this.articulosAlquilados = [];
        this.updateArticulosToShow();
      });
    } else {

    }
  }
  showClientError = false;

  clearAlquiler() {
    this.alquiler = {
      id: null,
      cliente: null,
      fechaInicio: new Date(),
      fechaFin: new Date( Date.now() + (86400000 * 7 ))
    }
  }

}
