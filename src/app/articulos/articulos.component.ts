import { JuegosService } from './../services/juegos.service';
import { PlataformasService } from './../services/plataformas.service';
import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { Juego, Plataforma, Articulo } from 'src/app/models';

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
  displayedColumns: string[] = ['juego', 'plataforma', 'formato', 'cantDispAlquiler', 'cantDispVenta',
      'precioAlquiler', 'precioVenta', 'action'];
  editing = false;
  articulo: Articulo;
  searchText = '';
  formatos: any[];

  constructor(protected articulosService: ArticulosService,
              protected plataformasService: PlataformasService,
              protected juegosService: JuegosService) { }

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
