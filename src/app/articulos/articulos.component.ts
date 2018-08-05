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
  displayedColumns: string[] = ['id', 'juego', 'plataforma', 'formato', 'cantidad', 'precioAlquiler', 'precioVenta', 'action'];
  editing: boolean = false;
  element: any = {};
  searchText: string = '';

  constructor(protected articulosService: ArticulosService,
              protected plataformasService: PlataformasService,
              protected juegosService: JuegosService) { }

  ngOnInit() {
    this.plataformasService.readPlataformas().then( (plataformas) => {
      this.plataformas = plataformas.json();
      this.juegosService.readJuegos().then( (juegos) => {
        this.juegos = juegos.json();
        this.readArticulos();
      } )
    })
  }

  readArticulos() {
    this.articulosService.readArticulos().then(articulos => {
      this.articulos = articulos.json();

      this.articulos.forEach(articulo => {
        articulo.juego = this.juegos.find( (element) => { return element.id == articulo.juegoId }).nombre;
        articulo.plataforma = this.plataformas.find( (element) => { return element.id == articulo.plataformaId }).nombre;
      })

      this.updateArticulosToShow();
    })
  }

  updateArticulosToShow() {
    this.articulosToShow = [];
    this.articulos.forEach(articulo => {
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
    this.articulosService.deleteArticulo(id).then( articulos => {
      this.articulos = articulos.json();
      this.updateArticulosToShow();
    })
  }

  add() {
    this.element = { nombre: ''};
    this.editing = true;
  }

  closeEditing() {
    this.editing = false;
  }

  saveElement() {
    if (this.element.id) {
      this.articulosService.updateArticulo(this.element).then(articulos => {
        this.articulos = articulos.json();
        this.updateArticulosToShow();
        this.editing = false;
      })
    } else {
      this.articulosService.addArticulo(this.element).then(articulos => {
        this.articulos = articulos.json();
        this.updateArticulosToShow();
        this.editing = false;
      })
    }
  }
}
