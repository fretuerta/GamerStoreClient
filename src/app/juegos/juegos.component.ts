import { Component, OnInit, ViewChild } from '@angular/core';
import { JuegosService } from '../services/juegos.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  
  juegos: any[];
  juegosToShow: any[];
  displayedColumns: string[] = ['id', 'nombre', 'caratula', 'action'];
  editing: boolean = false;
  element: any = {};
  searchText: string = '';

  constructor( protected juegosService: JuegosService) { }

  ngOnInit() { this.readJuegos() }

  updateJuegosToShow() {
    this.juegosToShow = [];
    this.juegos.forEach(juego => {
      if (juego.nombre.toUpperCase().indexOf(this.searchText.toUpperCase()) >= 0) {
        this.juegosToShow.push(juego);
      }
    });
  }

  clearSearchText() {
    this.searchText = '';
    this.updateJuegosToShow();
  }

  readJuegos() {
    this.juegosService.readJuegos().then(juegos => {
      this.juegos = juegos.json();
      this.updateJuegosToShow();
    })
  }

  edit(element: any) {
    Object.assign(this.element, element);
    this.editing = true;
  }

  remove(id: number) {
    this.juegosService.deleteJuego(id).then( juegos => {
      this.juegos = juegos.json();
      this.updateJuegosToShow();
    })
  }

  add() {
    this.element = { nombre: ''};
    this.editing = true;
  }

  closeEditing() {
    this.editing = false;
  }

  onFileChange(event) {
    let reader: FileReader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.element.caratula = reader.result;
      };
    }
  }

  resetImage() {
    this.element.caratula = null;
  }

  saveElement() {
    if (this.element.id) {
      this.juegosService.updateJuego(this.element).then(juegos => {
        this.juegos = juegos.json();
        this.updateJuegosToShow();
        this.editing = false;
      })
    } else {
      this.juegosService.addJuego(this.element).then(juegos => {
        this.juegos = juegos.json();
        this.updateJuegosToShow();
        this.editing = false;
      })
    }
  }

}
