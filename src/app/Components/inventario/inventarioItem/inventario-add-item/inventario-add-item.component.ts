import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { InventarioService } from 'src/app/Service/inventario.service';
import { Articulo } from 'src/app/Shared/model/articuloModel';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogCommunicationService } from 'src/app/Service/dialogCommunicationService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inventario-add-item',
  templateUrl: './inventario-add-item.component.html',
  styleUrls: ['./inventario-add-item.component.css']
})

export class InventarioAddItemComponent {
    newItem: Articulo = {
      id : '',
      model: '',
      salesSample: '',
      sourcingTrackingNumber: '',
      warrant: '',
      originCountry: '',
      destinationCountry: '',
      warehouse: '',
      timeOfArrival: new Date(),
      currentLocation: '',
      incoterm: '',
      containerNumber: '',
      sku:'',
      description:'',
      available:0,
      qtyGross:0,
      qtyNet:0,
      reserved:0,
      potentialBuyer:'',
      activo:true
    };
    visible: boolean = false;

    constructor(
      private articleService: InventarioService,
      private dialogRef: DynamicDialogRef,
      private dialogService: DialogCommunicationService,
      private messageService: MessageService) {
    }

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
    this.dialogRef.close();
    this.dialogService.notifyDialogClosed();
  }

    saveItem() : void {
        this.articleService.saveArticle(this.newItem).subscribe(
        (response) => {
          // console.log('Artículo guardado con éxito:', response);
          this.messageService.add({ severity: 'success', summary: '', detail: 'Artículo guardado con éxito' });
          this.closeDialog();
        },
        (error) => {
          console.error('Error al guardar el artículo:', error);
          this.messageService.add({ severity: 'error', summary: '', detail: 'Error al guardar el artículo' });
        }
      );
    }



}
  