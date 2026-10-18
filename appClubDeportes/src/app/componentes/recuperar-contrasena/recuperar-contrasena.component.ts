import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {

  correo: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  obtenerContrasena() {
    if (!this.correo) {
      this.mensaje = 'Por favor, ingresa tu correo electrónico.';
      return;
    }

    this.http.post<any>('http://localhost:3000/api/recuperar-contrasena', { correo: this.correo })
      .subscribe({
        next: (res) => {
          this.mensaje = 'Tu contraseña fue enviada a tu correo.';
        },
        error: (err) => {
          console.error('Error al recuperar contraseña:', err);
          this.mensaje = err.error.message || 'No se pudo recuperar la contraseña.';
        }
      });
  }
}
