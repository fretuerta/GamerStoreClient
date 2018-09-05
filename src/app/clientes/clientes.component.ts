import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';

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

  constructor( protected clientesService: ClientesService ) { }

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
    this.clientesService.deleteCliente(id).then( () => {
      this.readClientes();
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
    if (this.element._id) {
      this.clientesService.updateCliente(this.element).then( () => {
        this.editing = false;
        this.readClientes();
      });
    } else {
      this.clientesService.addCliente(this.element).then( () => {
        this.editing = false;
        this.readClientes();
      });
    }
  }

}
