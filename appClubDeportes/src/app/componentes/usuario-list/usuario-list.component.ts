import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  terminoBusqueda: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos(): void {
    this.usuarioService.getUsuarios().subscribe(
      (res: any[]) => {
        console.log('Usuarios recibidos del backend:', res);

        // 🔹 Filtrar el admin
        this.usuarios = res.filter(u => u.rol !== 'admin');

        // Inicializa también los filtrados
        this.usuariosFiltrados = [...this.usuarios];
      },
      err => console.error('Error al cargar los usuarios:', err)
    );
  }

  filtrar(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.usuariosFiltrados = this.usuarios;
    } else {
      this.usuariosFiltrados = this.usuarios.filter(u =>
        (u.usuario || '').toLowerCase().startsWith(termino) ||
        (u.idMiembro?.toString() || '').toLowerCase().startsWith(termino)
      );
    }
  }

  editar(id: number): void {
    this.router.navigate(['/usuarios/actualizar', id]);
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(id).subscribe(
          () => {
            this.obtenerTodos();
            Swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado correctamente',
              'success'
            );
          },
          err => {
            console.error('Error al eliminar el usuario:', err);
            Swal.fire(
              'Error',
              'No se pudo eliminar el usuario',
              'error'
            );
          }
        );
      }
    });
  }
}
