import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { Articulo, Venta, Cliente, VentaDetalle } from '../models';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ClientesService } from '../services/clientes.service';
import { VentasService } from '../services/ventas.service';
import { ScanbarcodeComponent } from '../modals/scanbarcode/scanbarcode.component';
import { MatDialog } from '@angular/material';
import { HelpComponent } from '../modals/help/help.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  articulos: Articulo[];
  articulosToShow: Articulo[] = [];
  articulosVendidos: Articulo[] = [];
  codigoBarras: string = "";

  displayedColumns: string[] = ['juego', 'plataforma', 'formato', 'cantidad',
      'precioAlquiler', 'precioVenta', 'fechaCompra', 'fechaVenta', 'action'];
   
  searchText = '';
  formatos: any[];
  clientes: Cliente[];
  cliente: Cliente;
  venta: Venta = {};

  showScannerError = false;
  showClientError = false;
  showEmptyListError = false;
  isLoading = false;

  constructor(protected articulosService: ArticulosService,
              protected clientesService: ClientesService,
              protected ventasService: VentasService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.clearVenta();
    this.readArticulos();
    this.clientesService.readClientes().then( (clientes) => {
      this.clientes = clientes.json();
    })
  }

  readArticulos() {
    this.isLoading = true;
    this.articulosService.readArticulos().then( (articulos) => {
      this.articulos = articulos.json();
      this.updateArticulosToShow();
      this.isLoading = false;
    });
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

        this.articulosVendidos.forEach( (articulo) => {
          if (articulo.codigo.toUpperCase().indexOf(this.codigoBarras.toUpperCase()) >= 0) {
            encontrado = true;
            if (articulo.cantidad < articulo.cantDispVenta) {
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
              this.addToVendidos(articulo)
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
        if (!this.articulosVendidos.includes(articulo) && articulo.cantDispVenta > 0) {
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

  addToVendidos(articulo: Articulo) {
    this.articulosVendidos.push(articulo);
    this.updateArticulosToShow();
  }

  removeFromVendidos(articulo: Articulo) {
    this.articulosVendidos = this.articulosVendidos.filter(element => element.id != articulo.id);
    this.updateArticulosToShow();
  }

  saveVenta() {
    if (this.articulosVendidos.length == 0) {
      this.showEmptyListError = true;
      setTimeout(()=>{ this.showEmptyListError = false }, 1500)
      return;
    }
    
    this.showClientError = !this.cliente;
    if (this.cliente) {
      this.venta.cliente = this.cliente;
      this.venta.total = this.sumaTotal();
      this.venta.ventaDetalles = [];
      this.articulosVendidos.forEach((element)=>{
        let ventaDetalle: VentaDetalle = {
          articulo: element,
          cantidad: element.cantidad,
          precio: element.precioVenta
        }
        this.venta.ventaDetalles.push(ventaDetalle);
      })
      this.isLoading = true;
      this.ventasService.addVenta(this.venta).then((result)=>{
        this.articulosVendidos = [];
        this.readArticulos();
        this.isLoading = false;
      });
    }
  }

  clearVenta() {
    this.venta = {
      id: null,
      cliente: null,
      fechaVenta: new Date()
    }
  }

  sumaTotal() {
    let sumaT = 0;
    this.articulosVendidos.forEach((articulo)=>{
      sumaT += (articulo.cantidad * articulo.precioVenta);
    })
    return this.redonDosDec(sumaT);
  }

  redonDosDec(num: number) {
    return (Math.round(num * 100) / 100)
  }

  showHelp() {
    this.dialog.open(HelpComponent, {
      width: '50%',
      data: {name: 'ventasHelp'}
    });
  }

}
