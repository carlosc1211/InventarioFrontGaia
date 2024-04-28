import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
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
      private dialogService: DialogCommunicationService) {
    
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
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

    saveItem() : void {
        // this.articleService.saveArticle(this.newItem).subscribe(
        // (response) => {
        //   // console.log('Artículo guardado con éxito:', response);
        //   this.messageService.add({ severity: 'success', summary: '', detail: 'Artículo guardado con éxito' });
        //   this.closeDialog();
        // },
        // (error) => {
        //   console.error('Error al guardar el artículo:', error);
        //   this.messageService.add({ severity: 'error', summary: '', detail: 'Error al guardar el artículo' });
        // }
      //);
    }
}
