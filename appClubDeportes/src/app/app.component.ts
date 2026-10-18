import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './componentes/navigation/navigation.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    NavigationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appClubDeportes';

  constructor(public router: Router) {}

  get mostrarNavegacion(): boolean {
    return this.router.url !== '/login';
  }
}
