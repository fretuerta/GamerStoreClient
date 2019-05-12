import { Component, OnInit } from '@angular/core';
import { PlataformasService } from '../services/plataformas.service';
import { MatDialog } from '@angular/material';
import { HelpComponent } from '../modals/help/help.component';

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
  isLoading = false;

  constructor( protected plataformasService: PlataformasService,
      public dialog: MatDialog) { }

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
    this.isLoading = true;
    this.plataformasService.readPlataformas().then(plataformas => {
      this.plataformas = plataformas.json().sort((n1, n2) => {
        if (n1.nombre > n2.nombre) { return 1; }
        if (n1.nombre < n2.nombre) { return -1; }
        return 0;
      });
      this.updatePlataformasToShow();
      this.isLoading = false;
    });
  }

  edit(element: any) {
    Object.assign(this.element, element);
    this.editing = true;
  }

  remove(id: number) {
    this.plataformasService.deletePlataforma(id).then( (plataformas) => {
      this.plataformas = plataformas.json().sort((n1, n2) => {
        if (n1.nombre > n2.nombre) { return 1; }
        if (n1.nombre < n2.nombre) { return -1; }
        return 0;
      });
      this.updatePlataformasToShow();
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
    this.isLoading = true;
    if (this.element.id) {
      this.plataformasService.updatePlataforma(this.element).then(plataformas => {
        this.plataformas = plataformas.json().sort((n1, n2) => {
          if (n1.nombre > n2.nombre) { return 1; }
          if (n1.nombre < n2.nombre) { return -1; }
          return 0;
        });
        this.updatePlataformasToShow();
        this.editing = false;
        this.isLoading = false;
      });
    } else {
      this.plataformasService.addPlataforma(this.element).then(plataformas => {
        this.plataformas = plataformas.json().sort((n1, n2) => {
          if (n1.nombre > n2.nombre) { return 1; }
          if (n1.nombre < n2.nombre) { return -1; }
          return 0;
        });
        this.updatePlataformasToShow();
        this.editing = false;
        this.isLoading = false;
      });
    }
  }

  showHelp() {
    this.dialog.open(HelpComponent, {
      width: '50%',
      data: {name: 'plataformasHelp'}
    });

  }
}
