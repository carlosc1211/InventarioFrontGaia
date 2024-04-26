import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription, timeout } from 'rxjs';
import { InventarioService } from 'src/app/Service/inventario.service';
import { InventarioAddItemComponent } from '../inventarioItem/inventario-add-item/inventario-add-item.component';
import { Articulo } from 'src/app/Shared/model/articuloModel';
import { ConfirmationService, MessageService, SelectItem, TreeNode } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogCommunicationService } from 'src/app/Service/dialogCommunicationService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css']
})
export class InventarioListComponent implements OnInit, OnDestroy {
  articles: any[];
  articlesDetalle: any[];
  
  statuses!: SelectItem[];
  clonedProducts: { [s: string]: Articulo } = {};
  @ViewChild('exampleModal') exampleModal: InventarioAddItemComponent;
  sizes!: any[];
  visible: boolean = false;

  ref: DynamicDialogRef | undefined;
  private dialogClosedSubscription: Subscription;
  
  constructor(
    private articleService: InventarioService,
    private dialogService: DialogService,
    private router: Router,
    private dialogServiceClose: DialogCommunicationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }
  
    
  ngOnInit(): void {
    this.getArticles(); 
    this.sizes = [{ name: 'Small', class: 'p-datatable-sm' }];

    this.dialogClosedSubscription = this.dialogServiceClose.dialogClosed$.subscribe(() => {
      this.refreshGridData();
    });
  }

  ngOnDestroy() {
    this.dialogClosedSubscription.unsubscribe();
  }

   refreshGridData() {
    this.getArticles()
  }

  openDialog() {
    this.ref = this.dialogService.open(InventarioAddItemComponent, {
      header: 'Add new item',
      width: '65%'
    });
  }

  getArticles(): void {
    this.articleService.getAllArticles()
      .subscribe({
        next:articles=>{
          console.log('Articulos', articles);
          this.articles = articles;
        },
        error:e=>{
          console.log(e);
          this.messageService.add({ severity: 'error', summary: '', detail: 'Algo salió mal al obtener los artículos. Por favor, inténtelo de nuevo más tarde.' });
        }
      });
  }

  getDetailArticles(): void {
    this.articleService.getDetailArticles()
      .subscribe({
        next:articlesDetalle=>{
          console.log('Articulos Detalle', articlesDetalle);
          this.articlesDetalle = articlesDetalle;
        },
        error:e=>{
          console.log(e);
          this.messageService.add({ severity: 'error', summary: '', detail: 'Algo salió mal al obtener los artículos. Por favor, inténtelo de nuevo más tarde.' });
        }
      });
  }

  onRowEditInit(product: Articulo) {
      this.clonedProducts[product.containerNumber as string] = { ...product };
  }

  onRowEditSave(product: Articulo) {
    console.log(product)
    this.articleService.actualizarProducto(product).subscribe(
      response => {
        console.log('Producto actualizado:', response);
        this.messageService.add({ severity: 'success', summary: '', detail: 'Producto actualizado.' });
      });
    }

  onRowEditCancel(product: Articulo, index: number, event: Event) {
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
              product.activo = false;
              this.articleService.actualizarProducto(product).subscribe(response => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Articulo borrado' });
              });
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
            acceptButtonStyleClass:"p-button-danger p-b              utton-text",
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
