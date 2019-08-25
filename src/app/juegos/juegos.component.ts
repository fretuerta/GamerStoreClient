import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { JuegosService } from '../services/juegos.service';
import { MatDialog } from '@angular/material';
import { ScanbarcodeComponent } from '../modals/scanbarcode/scanbarcode.component';
import { HelpComponent } from '../modals/help/help.component';
import { TranslateService } from '../translate/translate.service';

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
  isLoading = false;

  constructor( protected juegosService: JuegosService,
               public dialog: MatDialog,
               protected translateService: TranslateService) { }

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
    this.isLoading = true;
    this.juegosService.readJuegos().then( (juegos) => {
      this.juegos = juegos;
      this.updateJuegosToShow();
      this.isLoading = false;
    });
  }

  edit(element: any) {
    Object.assign(this.element, element);
    this.editing = true;
  }

  remove(id: number) {
    if ( !confirm(this.translateService.instant('deleteWarning')) ) return ;
    this.juegosService.deleteJuego(id).then( (juegos) => {
      this.juegos = juegos;
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
    this.isLoading = true;
    if (this.element.id) {
      this.juegosService.updateJuego(this.element).then( (juegos) => {
        this.editing = false;
        this.juegos = juegos;
        this.updateJuegosToShow();
        this.isLoading = false;
      });
    } else {
      this.juegosService.addJuego(this.element).then( (juegos) => {
        this.editing = false;
        this.juegos = juegos;
        this.updateJuegosToShow();
        this.isLoading = false;
      });
    }
  }

  showHelp() {
    this.dialog.open(HelpComponent, {
      width: '50%',
      data: {name: 'juegosHelp'}
    });
  }

}
