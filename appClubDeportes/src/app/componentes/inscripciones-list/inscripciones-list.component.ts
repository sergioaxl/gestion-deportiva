import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { InscripcionService } from '../../servicios/inscripcion.service';
import { MiembroService } from '../../servicios/miembro.service';
import { DisciplinaService } from '../../servicios/disciplina.service';
import { Inscripcion } from '../../modelos/Inscripcion';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-inscripciones-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inscripciones-list.component.html',
  styleUrls: ['./inscripciones-list.component.css']
})
export class InscripcionesListComponent implements OnInit {
  inscripciones: Inscripcion[] = [];
  inscripcionesFiltradas: Inscripcion[] = [];
  miembros: any[] = [];
  disciplinas: any[] = [];
  terminoBusqueda: string = '';

  constructor(
    private inscripcionService: InscripcionService,
    private miembroService: MiembroService,
    private disciplinaService: DisciplinaService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Cargamos miembros y disciplinas primero para tener los nombres listos
    this.miembroService.getMiembros().subscribe(
      (miembros) => {
        this.miembros = miembros || [];
        // luego disciplinas
        this.disciplinaService.getDisciplinas().subscribe(
          (disciplinas) => {
            this.disciplinas = disciplinas || [];
            // y por último las inscripciones
            this.inscripcionService.getInscripciones().subscribe(
              (inscripciones) => {
                this.inscripciones = inscripciones || [];
                this.inscripcionesFiltradas = [...this.inscripciones];
              },
              (err) => console.error('Error al cargar inscripciones:', err)
            );
          },
          (err) => {
            console.error('Error al cargar disciplinas:', err);
            // aún intentar cargar inscripciones aunque falten disciplinas
            this.inscripcionService.getInscripciones().subscribe(
              (inscripciones) => {
                this.inscripciones = inscripciones || [];
                this.inscripcionesFiltradas = [...this.inscripciones];
              },
              (err2) => console.error('Error al cargar inscripciones:', err2)
            );
          }
        );
      },
      (err) => {
        console.error('Error al cargar miembros:', err);
        // si falla miembros, igual intentamos cargar inscripciones
        this.inscripcionService.getInscripciones().subscribe(
          (inscripciones) => {
            this.inscripciones = inscripciones || [];
            this.inscripcionesFiltradas = [...this.inscripciones];
          },
          (err2) => console.error('Error al cargar inscripciones:', err2)
        );
      }
    );
  }

  // Accepts number|string|undefined and returns string safe
  getNombreMiembro(id: number | string | undefined): string {
    if (id === undefined || id === null) return 'No especificado';
    const idStr = String(id);
    const m = this.miembros.find(x => String(x.idMiembros) === idStr);
    return m ? `${m.nombreMiembros || ''} ${m.apellidoPaterno || ''} ${m.apellidoMaterno || ''}`.trim() : 'No especificado';
  }

  getNombreDisciplina(id: number | string | undefined): string {
    if (id === undefined || id === null) return 'No especificada';
    const idStr = String(id);
    const d = this.disciplinas.find(x => String(x.idDisciplinas) === idStr);
    return d ? (d.nombreDisciplinas || d.nombreDisciplina || d.nombre || 'No especificada') : 'No especificada';
  }

  filtrarInscripciones(): void {
    const termino = this.terminoBusqueda.trim().toLowerCase();
    if (!termino) {
      this.inscripcionesFiltradas = [...this.inscripciones];
      return;
    }

    this.inscripcionesFiltradas = this.inscripciones.filter((i) => {
      const nombreMiembro = this.getNombreMiembro((i as any).idMiembros).toLowerCase();
      const nombreDisciplina = this.getNombreDisciplina((i as any).idDisciplinas).toLowerCase();
      const numIdMiembro = String((i as any).idMiembros || '').startsWith(termino);
      const numIdDisc = String((i as any).idDisciplinas || '').startsWith(termino);
      return nombreMiembro.includes(termino) || nombreDisciplina.includes(termino) || numIdMiembro || numIdDisc;
    });
  }

borrarInscripcion(idInscripciones: number | string): void {
  const idNum = Number(idInscripciones);
  if (isNaN(idNum)) {
    console.error('ID inválido al borrar:', idInscripciones);
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta inscripción será eliminada permanentemente.',
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
      this.inscripcionService.deleteInscripcion(idNum).subscribe(
        () => {
          Swal.fire({
            title: '¡Eliminado!',
            text: 'La inscripción ha sido eliminada correctamente.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            timer: 1500,
            showConfirmButton: false
          });
          this.cargarDatos();
        },
        (err) => {
          console.error('Error al eliminar inscripción:', err);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al eliminar la inscripción. Puede estar asociada a un miembro o disciplina.',
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
        }
      );
    }
  });
}  
}
