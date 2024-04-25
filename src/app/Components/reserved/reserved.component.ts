import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { DialogCommunicationService } from 'src/app/Service/dialogCommunicationService';
import { InventarioService } from 'src/app/Service/inventario.service';
import { Articulo } from 'src/app/Shared/model/articuloModel';
import { ArticuloReserva } from 'src/app/Shared/model/articuloReserva';

@Component({
  selector: 'app-tu-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css'],
  providers: [MessageService]
})
export class ReservedComponent implements OnInit {
  articles: Articulo[];
  selectedProducts: Articulo[] = [];
  selectedArticle: any;
  valorReservado: number = 0;
  isDisabled:boolean=true

  constructor(
    private articleService: InventarioService, 
    private messageService: MessageService,
    private fb: FormBuilder
  ) { 
  }

  ngOnInit(): void {
    this.getArticles();
  }

  onReservedChange(article: Articulo): void {
    // Busca el artículo correspondiente en selectedProducts y actualiza su propiedad reserved
    const selectedArticle = this.selectedProducts.find(item => item.model === article.model);
    
    if (selectedArticle) {
      selectedArticle.reserved = article.reserved;
      
      if (selectedArticle.reserved <= selectedArticle.qtyNet) {
          selectedArticle.available = selectedArticle.qtyNet - selectedArticle.reserved;
      } else {
          selectedArticle.available = 0; // o cualquier otro valor que desees
      }
    } else if (article.reserved < article.available) {
        article.available = article.qtyNet - article.reserved;  
    }
}

  onRowSelect(event: any) {
    this.selectedProducts.push(event.data);
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.model });
    console.log(this.selectedProducts);
  }

  onRowUnselect(event: any) {
    const index = this.selectedProducts.findIndex((item: Articulo) => item.model === event.data.model);
    if (index !== -1) {
        this.selectedProducts.splice(index, 1);
    }
    event.data.reserved = 0;
    // this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.model });
  }  

  getArticles(): void {
    this.articleService.getAllArticles()
      .subscribe({
        next: articles => {
          console.log('Articulos', articles);
          this.articles = articles;
        },
        error: e => {
          console.log(e);
          this.messageService.add({ severity: 'error', summary: '', detail: 'Algo salió mal al obtener los artículos. Por favor, inténtelo de nuevo más tarde.' });
        }
      });
  }

  onSave(): void {
    if (this.selectedProducts.length > 0) { 
      this.selectedProducts.forEach(element => {
        var nuevaReserva = new ArticuloReserva();
        nuevaReserva.id = element.id;
        nuevaReserva.available = element.available;
        nuevaReserva.articulo = element.id;
        nuevaReserva.reserved = element.reserved;
        nuevaReserva.sku = element.sku;

        this.articleService.saveArticleReserved(nuevaReserva).subscribe((response => {
          console.log(response);
        }))  
      });
    } else {
      this.messageService.add({ severity: 'error', summary: '', detail: 'No hay elementos seleccionados para guardar.'});
    }
  }

}
