import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { Articulo, Alquiler, Cliente, AlquilerDetalle } from '../models';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ClientesService } from '../services/clientes.service';
import { AlquileresService } from '../services/alquileres.service';
import { ScanbarcodeComponent } from '../modals/scanbarcode/scanbarcode.component';
import { MatDialog } from '@angular/material';
import { HelpComponent } from '../modals/help/help.component';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent implements OnInit {

  articulos: Articulo[];
  articulosToShow: Articulo[] = [];
  articulosAlquilados: Articulo[] = [];
  codigoBarras: string = "";

  displayedColumns: string[] = ['juego', 'plataforma', 'formato', 'cantidad',
      'precioAlquiler', 'precioVenta', 'fechaCompra', 'fechaVenta', 'action'];
   
  searchText = '';
  formatos: any[];
  clientes: Cliente[];
  cliente: Cliente;
  alquiler: Alquiler = {};

  showScannerError = false;
  showClientError = false;
  showEmptyListError = false;

  constructor(protected articulosService: ArticulosService,
              protected clientesService: ClientesService,
              protected alquileresService: AlquileresService,
              public dialog: MatDialog) { }

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

  scanBarCode(): void {
    const dialogRef = this.dialog.open(ScanbarcodeComponent, {
      width: '500px',
      minHeight: '300px',
      hasBackdrop: true,
      data: { codigo: this.codigoBarras }
    });

    dialogRef.afterClosed().toPromise().then(result => {
      if (result) {
        this.codigoBarras = result;
        let encontrado = false;

        this.articulosAlquilados.forEach( (articulo) => {
          if (articulo.codigo.toUpperCase().indexOf(this.codigoBarras.toUpperCase()) >= 0) {
            encontrado = true;
            if (articulo.cantidad < articulo.cantDispAlquiler) {
              articulo.cantidad++;
            } else {
              this.showScannerError = true;
              setTimeout(()=>{ this.showScannerError = false }, 1500)
            }
          }
        })

        if (!encontrado) {
          this.articulos.forEach((articulo) => {
            if (articulo.codigo.toUpperCase().indexOf(this.codigoBarras.toUpperCase()) >= 0) {
              encontrado = true;
              this.addToAlquilados(articulo)
            }
          })
        }

        if (!encontrado) {
          this.showScannerError = true;
          setTimeout(()=>{ this.showScannerError = false }, 1500)
        }
    
      }
    });
  }

  updateArticulosToShow() {
    this.articulosToShow = [];
    this.articulos.forEach(articulo => {
      if (articulo.juego.nombre.toUpperCase().indexOf(this.searchText.toUpperCase()) >= 0 ||
        articulo.codigo.toUpperCase().indexOf(this.searchText.toUpperCase()) >= 0) {
        if (!this.articulosAlquilados.includes(articulo)) {
          articulo.cantidad = 1;
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
    if (this.articulosAlquilados.length == 0) {
      this.showEmptyListError = true;
      setTimeout(()=>{ this.showEmptyListError = false }, 1500)
      return;
    }
    
    this.showClientError = !this.cliente;
    if (this.cliente) {
      this.alquiler.cliente = this.cliente;
      this.alquiler.total = this.sumaTotal();
      this.alquiler.alquilerDetalles = [];
      this.articulosAlquilados.forEach((element)=>{
        let alquilerDetalle: AlquilerDetalle = {
          articulo: element,
          cantidad: element.cantidad,
          precio: element.precioAlquiler
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

  clearAlquiler() {
    this.alquiler = {
      id: null,
      cliente: null,
      fechaInicio: new Date(),
      fechaFin: new Date( Date.now() + (86400000 * 7 ))
    }
  }

  sumaTotal() {
    let sumaT = 0;
    this.articulosAlquilados.forEach((articulo)=>{
      sumaT += (articulo.cantidad * articulo.precioAlquiler);
    })
    return this.redonDosDec(sumaT);
  }

  redonDosDec(num: number) {
    return (Math.round(num * 100) / 100)
  }

  showHelp() {
    this.dialog.open(HelpComponent, {
      width: '50%',
      data: {name: 'alquileresHelp'}
    });
  }

}
