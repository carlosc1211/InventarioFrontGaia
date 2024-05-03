import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InventarioService } from 'src/app/Service/inventario.service';
import { SpinnerService } from 'src/app/Service/spinner.service';
import { ClientModel } from 'src/app/Shared/model/clientModel';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  client: ClientModel = {
    Nombre: '',
    Direccion: '',
    Identificacion: '',
    Id: '',
  };

  listClient: any[] = [];
  backInventory: any;

  constructor(
    private clientService: InventarioService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ObtenerCliente();
  }

  backToInventory() {
    this.router.navigate(['launchpad']);
  }

  ObtenerCliente(): void {
    this.clientService.getListClient().subscribe({
      next: (clientes) => {
        this.listClient = clientes;
        console.log(this.listClient);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail: err,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: '',
          detail: 'Lista de clientes',
        });
      },
    });
  }

  Save(): void {
    this.client.Id = '9d343fec-bb1d-4eba-9764-e192488a6335';
    console.log(this.client);
    this.clientService.saveClient(this.client).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail: err,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: '',
          detail: 'Cliente creado correctamente',
        });
      },
    });
  }
}
