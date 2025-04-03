import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent {
  title = 'PrazoCerto';

  constructor(public theme: ThemeService) {}

  // Exemplo de função para alternar entre lara-light e lara-dark
  alternarTema() {
    const atual = this.theme.getCurrentTheme();
    const novoTema = atual.includes('light') ? 'lara-dark-blue' : 'lara-light-blue';
    this.theme.setTheme(novoTema);
  }
}
