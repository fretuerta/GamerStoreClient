import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {


  articulos: any[];
  articulosToShow: any[];
  displayedColumns: string[] = ['id', 'nombre', 'action'];
  editing: boolean = false;
  element: any = {};
  searchText: string = '';

  constructor( protected articulosService: ArticulosService) { }

  ngOnInit() { this.readArticulos() }

  updateArticulosToShow() {
    this.articulosToShow = [];
    this.articulos.forEach(articulo => {
      if (articulo.nombre.toUpperCase().indexOf(this.searchText.toUpperCase()) >= 0) {
        this.articulosToShow.push(articulo);
      }
    });
  }

  clearSearchText() {
    this.searchText = '';
    this.updateArticulosToShow();
  }

  readArticulos() {
    this.articulosService.readArticulos().then(articulos => {
      this.articulos = articulos.json();
      this.updateArticulosToShow();
    })
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
