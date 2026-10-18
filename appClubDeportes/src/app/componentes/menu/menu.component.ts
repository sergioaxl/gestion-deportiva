import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router) {}

  logout() {
    // Limpiar sesión
    localStorage.clear();

    // Redirigir al login reemplazando la URL actual en el historial
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  isMenuOpen = false;

  toggleUserMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
