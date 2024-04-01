import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { timeout } from 'rxjs';
import { InventarioService } from 'src/app/Service/inventario.service';
import { InventarioAddItemComponent } from '../inventarioItem/inventario-add-item/inventario-add-item.component';



@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css']
})
export class InventarioListComponent {
    articles: any[] = [];
    pagedArticles: any[] = []; // Esta será la lista de elementos a mostrar en la página actual
    currentPage: number = 1;
    itemsPerPage: number = 3; // Cantidad de elementos por página

    // Calcula el total de páginas
    get totalPages(): number {
        return Math.ceil(this.articles.length / this.itemsPerPage);
    }

    // Crea un array de números de página
    get pages(): number[] {
        const pagesArray = [];
        for (let i = 1; i <= this.totalPages; i++) {
            pagesArray.push(i);
        }
        return pagesArray;
    }

    // Actualiza los elementos a mostrar en base a la página seleccionada
    setPage(page: number) {
        if (page < 1 || page > this.totalPages) {
            return;
        }
        this.currentPage = page;
        const startIndex = (page - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.articles.length);

        this.pagedArticles = this.articles.slice(startIndex, endIndex);
    }

    // Va a la página anterior
    prevPage() {
        this.setPage(this.currentPage - 1);
    }

    // Va a la página siguiente
    nextPage() {
        this.setPage(this.currentPage + 1);
    }

  @ViewChild('exampleModal') exampleModal: InventarioAddItemComponent;

  constructor(
    private articleService: InventarioService,
    private renderer: Renderer2, 
    private el: ElementRef) { }

  ngOnInit(): void {
    this.getArticles();

    // setTimeout(() => {
    // this.setPage(1);  
    // }, 100);
    
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

  editItem(item: any) {
    console.log('Editar artículo:', item);
  }

  deleteItem(item: any) {
    const index = this.articles.indexOf(item);
    if (index !== -1) {
      this.articles.splice(index, 1);
      console.log('Artículo eliminado:', item);
    }
  }

}
