import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { JuegosService } from '../services/juegos.service';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css'],

  encapsulation: ViewEncapsulation.None
})
export class JuegosComponent implements OnInit {

  @ViewChild('fileInput') fileInput;

  @ViewChild(BarecodeScannerLivestreamComponent)
  BarecodeScanner: BarecodeScannerLivestreamComponent;

  juegos: any[];
  juegosToShow: any[];
  displayedColumns: string[] = ['nombre', 'codigo', 'caratula', 'action'];
  editing = false;
  element: any = {};
  searchText = '';
  isScanningBarCode = false;

  constructor( protected juegosService: JuegosService) { }

  ngOnInit() { this.readJuegos(); }

  scanBarCode(up: boolean) {
    up ? this.BarecodeScanner.start() : this.BarecodeScanner.stop();
    this.isScanningBarCode = up;
  }

  onValueChanges(value) {
    this.element.codigo = value.code;
    this.BarecodeScanner.stop();
    this.isScanningBarCode = false;
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
    this.juegosService.readJuegos().then(juegos => {
      this.juegos = juegos.json();
      this.updateJuegosToShow();
    });
  }

  edit(element: any) {
    Object.assign(this.element, element);
    this.editing = true;
  }

  remove(id: number) {
    this.juegosService.deleteJuego(id).then( () => {
      this.readJuegos();
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
    if (this.element._id) {
      this.juegosService.updateJuego(this.element).then( () => {
        this.editing = false;
        this.readJuegos();
      });
    } else {
      this.juegosService.addJuego(this.element).then( () => {
        this.editing = false;
        this.readJuegos();
      });
    }
  }

}
