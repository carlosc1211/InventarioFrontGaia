import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { DialogCommunicationService } from 'src/app/Service/dialogCommunicationService';
import { InventarioService } from 'src/app/Service/inventario.service';
import { Articulo } from 'src/app/Shared/model/articuloModel';

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
  // isDisabled:boolean=true

  constructor(
    private articleService: InventarioService, 
    private messageService: MessageService,
    private fb: FormBuilder
  ) { 
  }

  ngOnInit(): void {
    this.getArticles();
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
    this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.model });
    console.log(this.selectedProducts)
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
    if (this.selectedProducts.length > 0) { // Verifica si hay elementos seleccionados
      console.log(this.selectedProducts);
      // Aquí puedes enviar los elementos seleccionados a tu servicio para guardarlos en la base de datos
    } else {
      console.log('No hay elementos seleccionados para guardar.');
    }
  }
}
