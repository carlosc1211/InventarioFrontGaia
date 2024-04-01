import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { timeout } from 'rxjs';
import { InventarioService } from 'src/app/Service/inventario.service';
import { InventarioAddItemComponent } from '../inventarioItem/inventario-add-item/inventario-add-item.component';
import { Articulo } from 'src/app/Shared/model/articuloModel';
import { SelectItem } from 'primeng/api';



@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css']
})
export class InventarioListComponent {
    articles: any[] = [];
    statuses!: SelectItem[];
    clonedProducts: { [s: string]: Articulo } = {};
    @ViewChild('exampleModal') exampleModal: InventarioAddItemComponent;
    sizes!: any[];

  constructor(
    private articleService: InventarioService,
    private renderer: Renderer2, 
    private el: ElementRef) { }

  ngOnInit(): void {
    this.getArticles(); 

    this.sizes = [{ name: 'Small', class: 'p-datatable-sm' }];
  }

  openModal(): void {
    this.renderer.addClass(document.body, 'modal-open');
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.querySelector('.modal'), 'display', 'block');
  }

  getArticles(): void {
    this.articleService.getAllArticles()
      .subscribe({
        next:articles=>{
          console.log(articles);
          this.articles = articles;
        },
        error:e=>{
          console.log(e);
        }
      });
  }

  onRowEditInit(product: Articulo) {
      this.clonedProducts[product.containerNumber as string] = { ...product };
  }

  onRowEditSave(product: Articulo) {
    console.log(product)
      // if (product.price > 0) {
      //     delete this.clonedProducts[product.id as string];
      //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
      // } else {
      //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
      // }
  }

  onRowEditCancel(product: Articulo, index: number) {
      this.articles[index] = this.clonedProducts[product.id as string];
      //delete this.clonedProducts[product.id as string];
  }

}
