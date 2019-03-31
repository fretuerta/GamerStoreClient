import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { JuegosService } from '../services/juegos.service';
import { MatDialog } from '@angular/material';
import { ScanbarcodeComponent } from '../modals/scanbarcode/scanbarcode.component';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css'],

  encapsulation: ViewEncapsulation.None
})
export class JuegosComponent implements OnInit {

  @ViewChild('fileInput') fileInput;

  juegos: any[];
  juegosToShow: any[];
  displayedColumns: string[] = ['nombre', 'codigo', 'caratula', 'action'];
  editing = false;
  element: any = {};
  searchText = '';

  constructor( protected juegosService: JuegosService,
               public dialog: MatDialog) { }

  ngOnInit() { this.readJuegos(); }

  scanBarCode(): void {
    const dialogRef = this.dialog.open(ScanbarcodeComponent, {
      width: '500px',
      minHeight: '300px',
      hasBackdrop: true,
      data: { codigo: this.element.codigo }
    });

    dialogRef.afterClosed().toPromise().then(result => {
      if (result) { this.element.codigo = result; }
    });
  }

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
    this.juegosService.readJuegos().then( (juegos) => {
      this.juegos = juegos.json();
      this.updateJuegosToShow();
    });
  }

  edit(element: any) {
    Object.assign(this.element, element);
    this.editing = true;
  }

  remove(id: number) {
    this.juegosService.deleteJuego(id).then( (juegos) => {
      this.juegos = juegos.json();
      this.updateJuegosToShow();
    });
  }

  add() {
    this.element = { nombre: '', codigo: '' };
    this.editing = true;
  }

  closeEditing() {
    this.editing = false;
  }

  onFileChange(event) {
    const reader: FileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
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
      this.juegosService.updateJuego(this.element).then( (juegos) => {
        this.editing = false;
        this.juegos = juegos.json();
        this.updateJuegosToShow();
      });
    } else {
      this.juegosService.addJuego(this.element).then( (juegos) => {
        this.editing = false;
        this.juegos = juegos.json();
        this.updateJuegosToShow();
      });
    }
  }

}
