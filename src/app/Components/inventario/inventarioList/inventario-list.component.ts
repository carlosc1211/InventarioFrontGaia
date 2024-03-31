import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { InventarioService } from 'src/app/Service/inventario.service';

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

  showModal: boolean = false;


  constructor(private articleService: InventarioService) { 
  }

  ngOnInit(): void {
    this.getArticles();

    setTimeout(() => {
    this.setPage(1);  
    }, 100);
    
  }

  openModal() {
    this.showModal = true;
  }


  closeModal() {
    this.showModal = false;
  }

  onArticleSaved() {
    // Este método será invocado cuando el evento articleSaved sea emitido desde el componente modal
    // Cierra el modal
    this.closeModal();
  }

  getArticles(): void {
    this.articleService.getAllArticles()
      .subscribe(articles => this.articles = articles);
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
