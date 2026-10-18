import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
import { MiembroService } from '../../servicios/miembro.service';
import { Miembro } from '../../modelos/Miembro';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-miembros-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './miembros-list.component.html',
  styleUrls: ['./miembros-list.component.css']  // <- corregido aquí (plural)
})
export class MiembrosListComponent implements OnInit {
  miembros: Miembro[] = [];
  miembrosFiltrados: Miembro[] = [];
  terminoBusqueda: string = '';

  constructor(private miembroService: MiembroService) {}

  ngOnInit(): void {
    this.obtenerMiembros();
  }

obtenerMiembros(): void {
  this.miembroService.getMiembros().subscribe(
    (res: Miembro[]) => {
      // Filtrar por ID (oculta el admin)
      this.miembros = res.filter(m => m.idMiembros !== '0000000000001');
      this.miembrosFiltrados = this.miembros;
    },
    err => console.error(err)
  );
}



  filtrarMiembros(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.miembrosFiltrados = this.miembros;
    } else {
      this.miembrosFiltrados = this.miembros.filter(m =>
        (m.nombreMiembros?.toLowerCase().startsWith(termino)) ||
        (m.apellidoPaterno?.toLowerCase().startsWith(termino)) ||
        (m.apellidoMaterno?.toLowerCase().startsWith(termino)) ||
        (m.categoria?.toLowerCase().startsWith(termino))
      );
    }
  }

borrarMiembro(idMiembros?: string): void {
  if (!idMiembros) {
    console.error('ID de miembro no definido');
    return;
  }
  

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Este miembro será eliminado permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    backdrop: `
      rgba(0,0,0,0.4)
      left top
      no-repeat
    `
  }).then((result) => {
    if (result.isConfirmed) {
      this.miembroService.deleteMiembro(idMiembros).subscribe(
        res => {
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El miembro ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            timer: 1500,
            showConfirmButton: false
          });
          this.obtenerMiembros();
        },
        err => {
          console.error('Error al eliminar miembro:', err);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al eliminar el miembro. Este Miembro pertenece ya a una Disciplina o Evento Deportivo',
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
        }
      );
    }
  });
  
}

}
