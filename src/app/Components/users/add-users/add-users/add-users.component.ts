import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { DialogCommunicationService } from 'src/app/Service/dialogCommunicationService';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent {
  usuarioForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private dialogRef: DynamicDialogRef,
      private dialogService: DialogCommunicationService,
      private usuarioService: AuthService,
      private messageService: MessageService) {
    
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: [''],
      usuario: ['', [Validators.required]],
      constrasenya: ['', Validators.required],
      rol: ['', Validators.required],
    });
    
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      // Aquí puedes enviar los datos del formulario a tu backend o realizar otras acciones
      console.log(this.usuarioForm.value);
      // También puedes reiniciar el formulario después de enviar los datos
      this.usuarioForm.reset();
    }
  }

   closeDialog() {
    this.dialogRef.close();
    this.dialogService.notifyDialogClosed();
  }

  saveItem(): void {
    this.usuarioService.saveUsuario(this.usuarioForm).subscribe((response) => {
      console.log(response)
      this.closeDialog();
    }, (error) => {
      console.error('Error al guardar el usuario:', error);
      this.messageService.add({ severity: 'error', summary: '', detail: 'Error al guardar el usuario' });
        })
    }
}
