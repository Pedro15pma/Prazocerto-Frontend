import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ProdutosService, Produto } from './produtos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DataViewModule, SelectButtonModule, ButtonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Array que receberá os produtos da API
  products: Produto[] = [];

  // Define se a visualização é em "list" (lista) ou "grid" (grade)
  layout: 'list' | 'grid' = 'list';

  // Opções do SelectButton para alternar layout
  options: any[] = [
    { label: 'Lista', value: 'list' },
    { label: 'Grade', value: 'grid' }
  ];

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    // Busca os produtos ao iniciar
    this.produtosService.getProdutos().subscribe({
      next: (data) => {
        // Se quiser ver no console, descomente:
        // console.log('Recebido do backend:', data);

        // Ajusta cada produto para ter campos extras (inventoryStatus, rating, etc.)
        // Caso não queira, basta usar 'this.products = data;' diretamente.
        this.products = data.map((prod) => ({
          ...prod,
          // Se quiser usar "price" no template, defina-o aqui:
          price: prod.preco_original,
          inventoryStatus: prod.quantidade_estoque > 0 ? 'INSTOCK' : 'OUTOFSTOCK',
          rating: 5,
          category: 'Produto'
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });
  }

  // Caso queira usar no template (por exemplo, em <p-tag>),
  // você pode criar uma função para retornar a severidade
  getSeverity(prod: Produto): string {
    switch (prod.inventoryStatus) {
      case 'INSTOCK':
        return 'success';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }
}
