import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MiembroEventoDeportivoService } from '../../servicios/miembro-evento-deportivo.service';
import { MiembroEventoDeportivo } from '../../modelos/MiembroEventoDeportivo';
import { MiembroService } from '../../servicios/miembro.service';
import { EventoDeportivoService } from '../../servicios/evento-deportivo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-miembroseventodeportivo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './miembroseventodeportivo-list.component.html',
  styleUrls: ['./miembroseventodeportivo-list.component.css']
})
export class MiembroseventodeportivoListComponent implements OnInit {
  miembrosEventoDeportivo: MiembroEventoDeportivo[] = [];
  miembrosEventoDeportivoFiltrados: MiembroEventoDeportivo[] = [];
  terminoBusqueda: string = '';

  miembros: any[] = [];
  eventos: any[] = [];

  constructor(
    private router : Router,
    private miembroEventoDeportivoService: MiembroEventoDeportivoService,
    private miembroService: MiembroService,
    private eventoService: EventoDeportivoService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }
editar(id: number): void {
  this.router.navigate(['/miembrosEventosDeportivo/actualizar', id]);
}
  cargarDatos(): void {
    // Primero cargamos los miembros y eventos
    this.miembroService.getMiembros().subscribe(
      (res: any[]) => {
        this.miembros = res;
        this.eventoService.getEventos().subscribe(
          (res2: any[]) => {
            this.eventos = res2;
            // Cuando ya tenemos ambos, cargamos los registros
            this.obtenerTodos();
          },
          err => console.error('Error al cargar eventos deportivos:', err)
        );
      },
      err => console.error('Error al cargar miembros:', err)
    );
  }

  obtenerTodos(): void {
    this.miembroEventoDeportivoService.getMiembrosEventoDeportivo().subscribe(
      (res: MiembroEventoDeportivo[]) => {
        this.miembrosEventoDeportivo = res;
        this.miembrosEventoDeportivoFiltrados = res;
      },
      err => console.error('Error al cargar los datos:', err)
    );
  }

  filtrar(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.miembrosEventoDeportivoFiltrados = this.miembrosEventoDeportivo;
    } else {
      this.miembrosEventoDeportivoFiltrados = this.miembrosEventoDeportivo.filter(m =>
        this.getNombreMiembro(m.Miembros_idMiembros).toLowerCase().includes(termino) ||
        this.getNombreEvento(m.EventoDeportivo_idEventoDeportivo).toLowerCase().includes(termino)
      );
    }
  }

eliminar(id: number | string): void {
  const idNum = Number(id);
  if (isNaN(idNum)) {
    console.error('ID no válido:', id);
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.miembroEventoDeportivoService.deleteMiembroEventoDeportivo(idNum).subscribe(
        () => {
          this.obtenerTodos();
          Swal.fire(
            'Eliminado',
            'El registro ha sido eliminado correctamente',
            'success'
          );
        },
        err => {
          console.error('Error al eliminar el registro:', err);
          Swal.fire(
            'Error',
            'No se pudo eliminar el registro',
            'error'
          );
        }
      );
    }
  });
}


  getNombreMiembro(id: string | number): string {
    const miembro = this.miembros.find(m => String(m.idMiembros) === String(id));
    if (!miembro) return 'No especificado';
    return `${miembro.nombreMiembros || ''} ${miembro.apellidoPaterno || ''} ${miembro.apellidoMaterno || ''}`.trim();
  }

  getNombreEvento(id: string | number): string {
    const evento = this.eventos.find(e => String(e.idEventoDeportivo) === String(id));
    if (!evento) return 'No especificado';
    return evento.nombreEvento || evento.nombre || 'No especificado';
  }
}
