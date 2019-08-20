import { Component, OnInit } from '@angular/core';
import { Cliente, Factura } from '../models';
import { ClientesService } from '../services/clientes.service';
import { FacturasService } from '../services/facturas.service';
import { MatDialog } from '@angular/material';
import { HelpComponent } from '../modals/help/help.component';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: Factura[];
  facturasToShow: Factura[] = [];
  searchText = '';
  cliente: Cliente;
  clientes: Cliente[];
  displayedColumns: string[] = ['numero', 'fecha', 'total', 'action'];
  isLoading = false;

  constructor( protected clientesService: ClientesService,
              protected facturasService: FacturasService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.clientesService.readClientes().then( (clientes) => {
      this.clientes = clientes;
      this.isLoading = false;
    });
  }

  pedirFacturas() {
    this.isLoading = true;
    this.facturasService.readFacturas(this.cliente.id).then( (facturas) => {
      this.facturas = facturas;
      this.updateFacturasToShow();
      this.isLoading = false;
    });
  }

  updateFacturasToShow() {
    this.facturasToShow = [];
    this.facturas.forEach(factura => {
      if (factura.numFactura.toUpperCase().indexOf(this.searchText.toUpperCase()) >= 0) {
        this.facturasToShow.push(factura);
      }
    });
  }

  clearSearchText() {
    this.searchText = '';
    this.updateFacturasToShow();
  }

  downloadFactura(numFactura: string) {
    let tipo = numFactura.charAt(0);
    let id = numFactura.slice(1);
    this.isLoading = true;
    this.facturasService.downloadFacturaPDF(tipo, id).then((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      let fileURL = URL.createObjectURL(file);
      this.isLoading = false;
      window.open(fileURL);
    })
  }

  deleteFactura(numFactura) {
    this.isLoading = true;
    this.facturasService.deleteFactura(numFactura).then((response) => {
//      this.isLoading = false;
      this.pedirFacturas();
    })
  }

  showHelp() {
    this.dialog.open(HelpComponent, {
      width: '50%',
      data: {name: 'facturasHelp'}
    });
  }
}
