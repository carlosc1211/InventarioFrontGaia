import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { DialogCommunicationService } from 'src/app/Service/dialogCommunicationService';
import { InventarioService } from 'src/app/Service/inventario.service';
import { Articulo } from 'src/app/Shared/model/articuloModel';
import { InventarioAddItemComponent } from '../inventario-add-item/inventario-add-item.component';
import { ArticuloReserva } from 'src/app/Shared/model/articuloReserva';

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css'],
})
export class InventarioListComponent implements OnInit, OnDestroy {
  articles: any[];
  articlesDetalle: any[];
  clonedProducts: { [s: string]: Articulo } = {};
  sizes!: any[];
  isReservado: boolean;
  isConfirmado: boolean;
  NoConfirmado: boolean;

  visible: boolean = false;
  ref: DynamicDialogRef | undefined;
  private dialogClosedSubscription: Subscription;

  constructor(
    private articleService: InventarioService,
    private dialogService: DialogService,
    private router: Router,
    private dialogServiceClose: DialogCommunicationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getArticles();
    this.sizes = [{ name: 'Small', class: 'p-datatable-sm' }];

    this.dialogClosedSubscription =
      this.dialogServiceClose.dialogClosed$.subscribe(() => {
        this.refreshGridData();
      });
  }

  ngOnDestroy() {
    this.dialogClosedSubscription.unsubscribe();
  }

  refreshGridData() {
    this.getArticles();
  }

  openDialog() {
    this.ref = this.dialogService.open(InventarioAddItemComponent, {
      header: 'Add new item',
      width: '65%',
    });
  }

  isReservadoDisabled(registro: ArticuloReserva): boolean {
    return registro.status === 'Confirmado';
  }

  getArticles(): void {
    this.articleService.getAllArticles().subscribe({
      next: (articles) => {
        console.log('Articulos', articles);
        this.articles = articles;
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail:
            'Algo salió mal al obtener los artículos. Por favor, inténtelo de nuevo más tarde.',
        });
      },
    });
  }

  getDetailArticles(): void {
    this.articleService.getDetailArticles().subscribe({
      next: (articlesDetalle) => {
        console.log('Articulos Detalle', articlesDetalle);
        this.articlesDetalle = articlesDetalle;
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail:
            'Algo salió mal al obtener los artículos. Por favor, inténtelo de nuevo más tarde.',
        });
      },
    });
  }

  UpdateArticleReserved(articulo: ArticuloReserva) {
    this.articleService
      .actualizarArticuloReserva(articulo)
      .subscribe((response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: '',
          detail: 'Status actualizado.',
        });
      });
  }

  validarStatus(articuloReserva: ArticuloReserva): boolean {
    let bandera = false;

    this.articles.forEach((articulo) => {
      console.log(articulo);
      // if (
      //   articulo.articuloReservas.status == 'Confirmado' &&
      //   articuloReserva.status == 'Reservado'
      // ) {
      //   this.messageService.add({
      //     severity: 'danger',
      //     summary: '',
      //     detail: 'No puede pasar de Confirmado a Reservado.',
      //   });
      //   return bandera;
      // }
      // if (
      //   articulo.articuloReservas.status == 'NoConfirmado' &&
      //   articuloReserva.status == 'Confirmado'
      // ) {
      //   this.messageService.add({
      //     severity: 'danger',
      //     summary: '',
      //     detail: 'No puede pasar de NoConfirmado a Confirmado.',
      //   });
      //   return bandera;
      // }

      // return true;
    });
    return bandera;
  }

  onRowEditInit(product: Articulo) {
    this.clonedProducts[product.containerNumber as string] = { ...product };
  }

  onRowEditSave(product: Articulo) {
    console.log(product);
    this.articleService.actualizarProducto(product).subscribe((response) => {
      console.log('Producto actualizado:', response);
      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Producto actualizado.',
      });
    });
  }

  onRowEditCancel(product: Articulo, index: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Seguro desea eliminar el registro?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        product.activo = false;
        this.articleService
          .actualizarProducto(product)
          .subscribe((response) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Articulo borrado',
            });
          });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Articulo NO borrado',
        });
      },
    });
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-b              utton-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  backToInventory() {
    this.router.navigate(['launchpad']);
  }
}
