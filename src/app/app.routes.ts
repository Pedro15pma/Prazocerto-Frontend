import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'produtos',
    loadComponent: () => import('./produtos.component').then(m => m.ProdutosComponent)
  }
];
