import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { InventarioService } from 'src/app/Service/inventario.service';
import { Articulo } from 'src/app/Shared/model/articuloModel';
import { InventarioListComponent } from '../../inventarioList/inventario-list.component';

@Component({
  selector: 'app-inventario-add-item',
  templateUrl: './inventario-add-item.component.html',
  styleUrls: ['./inventario-add-item.component.css']
})

export class InventarioAddItemComponent {
    // newItem: Articulo = {
    //   model: '',
    //   salesSample: '',
    //   sourcingTrackingNumber: '',
    //   warrant: '',
    //   originCountry: '',
    //   destinationCountry: '',
    //   warehouse: '',
    //   timeOfArrival: new Date(),
    //   currentLocation: '',
    //   incoterm: '',
    //   containerNumber: ''
    // };

    @ViewChild('exampleModal') exampleModal: InventarioListComponent;

    constructor(
      private articleService: InventarioService,
      private renderer: Renderer2, 
      private el: ElementRef) {
    }

    // saveItem() : void {
    //     this.articleService.saveArticle(this.newItem).subscribe(
    //     (response) => {
    //       console.log('Artículo guardado con éxito:', response);
    //       this.closeModal();
    //     },
    //     (error) => {
    //       console.error('Error al guardar el artículo:', error);
    //       // Aquí puedes manejar el error
    //     }
    //   );
    // }

    closeModal(): void {
        this.renderer.removeClass(document.body, 'modal-open');
        this.renderer.setStyle(this.el.nativeElement.ownerDocument.querySelector('.modal'), 'display', 'none');
    }



}
  