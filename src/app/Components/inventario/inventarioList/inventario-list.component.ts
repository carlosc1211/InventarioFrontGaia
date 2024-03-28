import { Component } from '@angular/core';
import { InventarioService } from 'src/app/Service/inventario.service';

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css']
})
export class InventarioListComponent {
 articles: any[] = [];


  constructor(private articleService: InventarioService) { }

  ngOnInit(): void {
    this.getArticles();
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
