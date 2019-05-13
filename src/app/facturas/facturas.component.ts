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
    this.clientesService.readClientes().then( (clientes) => {
      this.clientes = clientes.json();
    });
  }

  pedirFacturas() {
    this.isLoading = true;
    this.facturasService.readFacturas(this.cliente.id).then( (facturas) => {
      this.facturas = facturas.json();
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
    console.log('numFactura: ', numFactura);
    let tipo = numFactura.charAt(0);
    let id = numFactura.slice(1);
    this.facturasService.downloadFacturaPDF(tipo, id).then((response) => {
      let file = new Blob([response.blob()], { type: 'application/pdf' });
      let fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })

  }

  showHelp() {
    this.dialog.open(HelpComponent, {
      width: '50%',
      data: {name: 'facturasHelp'}
    });
  }
}
