import { JuegosService } from './../services/juegos.service';
import { PlataformasService } from './../services/plataformas.service';
import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { Juego, Plataforma, Articulo } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { ScanbarcodeComponent } from '../modals/scanbarcode/scanbarcode.component';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  juegos: Juego[] = [];
  plataformas: Plataforma[];
  articulos: Articulo[];
  articulosToShow: Articulo[];
  displayedColumns: string[] = ['juego', 'plataforma', 'formato', 'codigo', 'cantDispAlquiler', 'cantDispVenta',
      'precioAlquiler', 'precioVenta', 'action'];
  editing = false;
  articulo: Articulo;
  searchText = '';
  formatos: any[];

  constructor(protected articulosService: ArticulosService,
              protected plataformasService: PlataformasService,
              protected juegosService: JuegosService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.plataformasService.readPlataformas().then( (plataformas) => {
      this.plataformas = plataformas.json();
      this.juegosService.readJuegos().then( (juegos) => {
        this.juegos = juegos.json();
        this.readArticulos();
      } );
    });

    this.formatos = [
      { nombre: 'CD'},
      { nombre: 'DVD'},
      { nombre: 'BluRay'}
    ];
  }

  scanBarCode(): void {
    const dialogRef = this.dialog.open(ScanbarcodeComponent, {
      width: '500px',
      minHeight: '300px',
      hasBackdrop: true,
      data: { codigo: this.articulo.codigo }
    });

    dialogRef.afterClosed().toPromise().then(result => {
      if (result) { this.articulo.codigo = result; }
    });
  }

  readArticulos() {
    this.articulosService.readArticulos().then(articulos => {
      this.articulos = articulos.json();
      this.updateArticulosToShow();
    });
  }

  updateArticulosToShow() {
    this.articulosToShow = [];
    this.articulos.forEach(articulo => {
      if (articulo.juego.nombre.toUpperCase().indexOf(this.searchText.toUpperCase()) >= 0) {
        this.articulosToShow.push(articulo);
      }
    });
  }

  clearSearchText() {
    this.searchText = '';
    this.updateArticulosToShow();
  }

  edit(element: any) {
    this.articulo = {};
    Object.assign(this.articulo, element);
    this.editing = true;
  }

  remove(id: number) {
    this.articulosService.deleteArticulo(id).then( () => {
      this.readArticulos();
    });
  }

  add() {
    this.clearArticulo();
    this.editing = true;
  }

  closeEditing() {
    this.editing = false;
  }

  clearArticulo() {
    this.articulo = {
      id: null,
      cantDispAlquiler: 0,
      cantDispVenta: 0,
      precioVenta: 0,
      precioAlquiler: 0,
      codigo: '',
      juego: {id: null},
      plataforma: {id: null, nombre: ''},
      formato: ''
    };
  }

  saveElement() {
    if (this.articulo.id) {
      this.articulosService.updateArticulo(this.articulo).then( () => {
        this.readArticulos();
        this.editing = false;
      });
    } else {
      this.articulosService.addArticulo(this.articulo).then( () => {
        this.readArticulos();
        this.editing = false;
      });
    }
  }
}
