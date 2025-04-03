import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProdutosComponent } from './produtos.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, ProdutosComponent, ButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PrazoCerto';

  constructor(public theme: ThemeService) {}

  alternarTema() {
    const atual = this.theme.getCurrentTheme();
    const novoTema = atual.includes('light') ? 'lara-dark-blue' : 'lara-light-blue';
    this.theme.setTheme(novoTema);
  }
}
