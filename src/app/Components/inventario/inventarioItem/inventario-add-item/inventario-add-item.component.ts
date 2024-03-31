import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventarioService } from 'src/app/Service/inventario.service';
import { Articulo } from 'src/app/Shared/model/articuloModel';

@Component({
  selector: 'app-inventario-add-item',
  templateUrl: './inventario-add-item.component.html',
  styleUrls: ['./inventario-add-item.component.css']
})

export class InventarioAddItemComponent {
    newItem: Articulo = {
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
    
    
  
  
    constructor(private articleService: InventarioService) {
    }
      // Función para guardar el nuevo item
      saveItem() {
        this.articleService.saveArticle(this.newItem).subscribe(
        (response) => {
          console.log('Artículo guardado con éxito:', response);
        },
        (error) => {
          console.error('Error al guardar el artículo:', error);
          // Aquí puedes manejar el error
        }
      );
    }
}
  