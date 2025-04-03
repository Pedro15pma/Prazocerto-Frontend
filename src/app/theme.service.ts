import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private current = 'lara-light-blue';

  setTheme(name: string) {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `assets/themes/${name}/theme.css`;
      this.current = name;
    }
  }

  getCurrentTheme() {
    return this.current;
  }
}
