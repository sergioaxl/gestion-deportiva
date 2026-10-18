import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @HostBinding('class') classes = 'row'; 

  usuario: string = '';
  contrasena: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
  const datos = {
    usuario: this.usuario,
    contrasena: this.contrasena
  };

  this.http.post<any>('http://localhost:3000/api/login', datos)
    .subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        this.mensaje = '';

        // ✅ Guardar correctamente los datos del usuario en localStorage
        if (res && res.usuario) {
          localStorage.setItem('idMiembro', res.usuario.idMiembro || '');
          localStorage.setItem('nombre', res.usuario.usuario || '');
          localStorage.setItem('rol', res.usuario.rol || '');
          localStorage.setItem('usuarioLogueado', JSON.stringify(res));

          console.log('✅ Datos guardados en localStorage:', {
            idMiembro: res.usuario.idMiembro,
            nombre: res.usuario.usuario,
            rol: res.usuario.rol
          });
        } else {
          console.warn('⚠️ La respuesta del backend no contiene "usuario".');
        }


        // 🟢 Guarda datos en localStorage
        if (res.idMiembro) {
          localStorage.setItem('idMiembro', res.idMiembro);
        } else if (res.miembro?.idMiembros) {
          localStorage.setItem('idMiembro', res.miembro.idMiembros);
        }
        // 🟢 NUEVO: guardar el nombre del miembro si está disponible
          if (res.miembro?.nombreMiembros) {
            localStorage.setItem('nombre', res.miembro.nombreMiembros);
          }

        if (res.rol) {
          localStorage.setItem('rol', res.rol);
        }

        // 🧭 Redirigir según el rol
        const rol = res.rol || res.usuario?.rol;
        if (rol === 'admin') {
          this.router.navigate(['/menu']);
        } else if (rol === 'miembro') {
          this.router.navigate(['/menuUser']);
        } else {
          this.mensaje = 'Rol no reconocido';
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.mensaje = err.error.message || 'Error al iniciar sesión';
      }
    });
}



}
