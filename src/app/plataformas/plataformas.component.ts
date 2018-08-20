import { Component, OnInit } from '@angular/core';
import { PlataformasService } from '../services/plataformas.service';

@Component({
  selector: 'app-plataformas',
  templateUrl: './plataformas.component.html',
  styleUrls: ['./plataformas.component.css']
})
export class PlataformasComponent implements OnInit {

  plataformas: any[];
  plataformasToShow: any[];
  displayedColumns: string[] = ['nombre', 'action'];
  editing = false;
  element: any = {};
  searchText = '';

  constructor( protected plataformasService: PlataformasService) { }

  ngOnInit() { this.readPlataformas(); }

  updatePlataformasToShow() {
    this.plataformasToShow = [];
    this.plataformas.forEach(plataforma => {
      if (plataforma.nombre.toUpperCase().indexOf(this.searchText.toUpperCase()) >= 0) {
        this.plataformasToShow.push(plataforma);
      }
    });
  }

  clearSearchText() {
    this.searchText = '';
    this.updatePlataformasToShow();
  }

  readPlataformas() {
    this.plataformasService.readPlataformas().then(plataformas => {
      this.plataformas = plataformas.json();
      this.updatePlataformasToShow();
    });
  }

  edit(element: any) {
    Object.assign(this.element, element);
    this.editing = true;
  }

  remove(id: number) {
    this.plataformasService.deletePlataforma(id).then( () => {
      // this.plataformas = plataformas.json();
      this.readPlataformas();
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
      this.plataformasService.updatePlataforma(this.element).then(plataformas => {
        this.readPlataformas();
        this.editing = false;
      });
    } else {
      this.plataformasService.addPlataforma(this.element).then(plataformas => {
        this.readPlataformas();
        this.editing = false;
      });
    }
  }
}
