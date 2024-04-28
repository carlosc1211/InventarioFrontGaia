import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { DialogCommunicationService } from 'src/app/Service/dialogCommunicationService';
import { Usuario } from 'src/app/Shared/model/usuarioModel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usuarios: Usuario[];
  roles: any[];
  statuses!: SelectItem[];
  clonedProducts: { [s: string]: Usuario } = {};
  selectedRol: any;
  

  constructor(
    private router: Router, 
    private usuariosService:AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.refreshGridData();
  }

  getAllUsers(){
    this.usuariosService.obtenerUsuarios()
      .subscribe({
        next:user=>{
          this.usuarios = user;
        },
        error:e=>{
          console.log(e);
          this.messageService.add({ severity: 'error', summary: '', detail: 'Algo salió mal al obtener los usuarios. Por favor, inténtelo de nuevo más tarde.' });
        }
      });
  }

  
  onRowEditInit(usuario: Usuario) {
      this.selectedRol = usuario.rol;
      this.clonedProducts[usuario.nombre as string] = { ...usuario };
  }

  onRowEditSave(usuario: Usuario) {
    console.log(usuario)
    this.usuariosService.actualizarUsuario(usuario).subscribe(
      response => {
        console.log('Usuario actualizado:', response);
        this.messageService.add({ severity: 'success', summary: '', detail: 'Usuario actualizado.' });
        this.refreshGridData();
      });
  }
  
  refreshGridData() {
    this.getAllUsers()
  }

  onRowEditCancel(usuario: Usuario, index: number, event: Event) {
        usuario.rol = this.selectedRol;
        this.selectedRol = null;

      this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Seguro desea eliminar el registro?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

            accept: () => {
              // product.activo = false;
              // this.articleService.actualizarProducto(product).subscribe(response => {
              //   this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Articulo borrado' });
              // });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Articulo NO borrado' });
            }
        });
  }

  confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

  backToInventory(){
    this.router.navigate(['launchpad']);  
  }
}
