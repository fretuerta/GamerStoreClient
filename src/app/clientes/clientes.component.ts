import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { MatDialog } from '@angular/material';
import { HelpComponent } from '../modals/help/help.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  clientes: any[];
  clientesToShow: any[];
  displayedColumns: string[] = [
    'nombre',
    'apellidos',
    'dni',
    'telefono',
    'direccion',
    'codPostal',
    'poblacion',
    'provincia',
    'action'
  ];
  editing = false;
  element: any = {};
  searchText = '';

  constructor( protected clientesService: ClientesService,
              public dialog: MatDialog ) { }

  ngOnInit() { this.readClientes(); }

  updateClientesToShow() {
    this.clientesToShow = [];
    this.clientes.forEach( cliente => {
      if (cliente.nombre.toUpperCase().indexOf(this.searchText.toUpperCase()) >= 0) {
        this.clientesToShow.push(cliente);
      }
    });
  }

  clearSearchText() {
    this.searchText = '';
    this.updateClientesToShow();
  }

  readClientes() {
    this.clientesService.readClientes().then( clientes => {
      this.clientes = clientes.json();
      this.updateClientesToShow();
    });
  }

  edit(element: any) {
    Object.assign(this.element, element);
    this.editing = true;
  }

  remove(id: number) {
    this.clientesService.deleteCliente(id).then( (clientes) => {
      this.clientes = clientes.json();
      this.updateClientesToShow();
    });
  }

  add() {
    this.element = { nombre: '' };
    this.editing = true;
  }

  closeEditing() {
    this.editing = false;
  }

  saveElement() {
    if (this.element.id) {
      this.clientesService.updateCliente(this.element).then( (clientes) => {
        this.clientes = clientes.json();
        this.updateClientesToShow();
        this.editing = false;
      });
    } else {
      this.clientesService.addCliente(this.element).then( (clientes) => {
        this.clientes = clientes.json();
        this.updateClientesToShow();
        this.editing = false;
      });
    }
  }

  showHelp() {
    this.dialog.open(HelpComponent, {
      width: '50%',
      data: {name: 'clientesHelp'}
    });
  }

}
