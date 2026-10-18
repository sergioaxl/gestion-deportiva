import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { EventoDeportivoService } from '../../servicios/evento-deportivo.service';
import { EventoDeportivo } from '../../modelos/EventoDeportivo';

@Component({
  selector: 'app-evento-deportivo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evento-deportivo-list.component.html',
  styleUrls: ['./evento-deportivo-list.component.css']
})
export class EventoDeportivoListComponent implements OnInit {
  eventosDeportivos: EventoDeportivo[] = [];
  eventosFiltrados: EventoDeportivo[] = [];
  terminoBusqueda: string = '';

  constructor(
    private eventoService: EventoDeportivoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this.eventoService.getEventos().subscribe(
      (res: EventoDeportivo[]) => {
        this.eventosDeportivos = res;
        this.eventosFiltrados = res;
      },
      err => console.error(err)
    );
  }

  filtrarEventos(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.eventosFiltrados = this.eventosDeportivos;
    } else {
      this.eventosFiltrados = this.eventosDeportivos.filter(evento =>
        (evento.nombreEvento?.toLowerCase().includes(termino)) ||
        (evento.lugar?.toLowerCase().includes(termino)) ||
        (evento.descripcion?.toLowerCase().includes(termino))   
      );
    }
  }

  borrarEvento(idEventoDeportivo: number): void {
    Swal.fire({
    title: '¿Estás seguro?',
    text: 'Este miembro será eliminado permanentemente.',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventoService.deleteEvento(idEventoDeportivo).subscribe(
          res => {
            this.obtenerEventos();
            Swal.fire('¡Eliminado!', 'El evento ha sido eliminado.', 'success');
          },
          err => Swal.fire('Error', 'No se pudo eliminar el evento.', 'error')
        );
      }
    });
  }

  editarEvento(idEventoDeportivo: number): void {
    this.router.navigate(['/eventos/actualizar', idEventoDeportivo]);
  }

  cancelar(): void {
    this.router.navigate(['/eventos']);
  }
}
