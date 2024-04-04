import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { InventarioService } from 'src/app/Service/inventario.service';
import { Articulo } from 'src/app/Shared/model/articuloModel';
import { InventarioListComponent } from '../../inventarioList/inventario-list.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

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
      containerNumber: ''
    };
    visible: boolean = false;

    constructor(
      private articleService: InventarioService,
      private dialogRef: DynamicDialogRef) {
    }

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
    this.dialogRef.close();
  }

    saveItem() : void {
        this.articleService.saveArticle(this.newItem).subscribe(
        (response) => {
          console.log('Artículo guardado con éxito:', response);
          this.closeDialog();
        },
        (error) => {
          console.error('Error al guardar el artículo:', error);
          // Aquí puedes manejar el error
        }
      );
    }



}
  