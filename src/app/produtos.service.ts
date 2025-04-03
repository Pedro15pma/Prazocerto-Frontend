import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Produto {
  id_produto: number;
  nome: string;
  descricao: string;
  preco_original: number;
  preco_desconto: number;
  validade: string;
  id_estabelecimento: number;
  quantidade_estoque: number;
  data_criacao: string;
  imagem_path: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private baseUrl = 'https://prazocerto-production-9ff2.up.railway.app/produtos';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(produtos =>
        produtos.map(produto => ({
          ...produto,
          preco_original: parseFloat(produto.preco_original),
          preco_desconto: parseFloat(produto.preco_desconto)
        }))
      )
    );
  }
}
