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

  juegos: Juego[];
  plataformas: Plataforma[];
  articulos: Articulo[];
  articulosToShow: Articulo[];
  displayedColumns: string[] = ['juego', 'plataforma', 'formato', 'cantidad', 'precioAlquiler', 'precioVenta', 'action'];
  editing = false;
  element: any = {};
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
      console.log('articulo: ', articulo);
      const juegoTemp = this.juegos.find(element => element.id === articulo.juegoId );
      console.log('juegoTemp: ', juegoTemp);
      articulo.juego = juegoTemp ? juegoTemp.nombre : '';
      const plataformaTemp = this.plataformas.find(element => element.id === articulo.plataformaId);
      articulo.plataforma = plataformaTemp ? plataformaTemp.nombre : '';
      if (articulo.juego.toUpperCase().indexOf(this.searchText.toUpperCase()) >= 0) {
        this.articulosToShow.push(articulo);
      }
    });
  }

  clearSearchText() {
    this.searchText = '';
    this.updateArticulosToShow();
  }

  edit(element: any) {
    Object.assign(this.element, element);
    this.editing = true;
  }

  remove(id: number) {
    this.articulosService.deleteArticulo(id).then( () => {
      this.readArticulos();
    });
  }

  add() {
    this.element = { nombre: ''};
    this.editing = true;
  }

  closeEditing() {
    this.editing = false;
  }

  saveElement() {
    if (this.element._id) {
      this.articulosService.updateArticulo(this.element).then( () => {
        this.readArticulos();
        this.editing = false;
      });
    } else {
      this.articulosService.addArticulo(this.element).then( () => {
        this.readArticulos();
        this.editing = false;
      });
    }
  }
}
