import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InventarioService } from 'src/app/Service/inventario.service';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent implements OnInit {
articles: any[];

constructor(
    private articleService: InventarioService,private messageService: MessageService) {
  
}

ngOnInit(): void {
    this.getArticles()
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

}
