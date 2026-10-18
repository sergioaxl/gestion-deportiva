import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { EntrenadorService } from '../../servicios/entrenador.service';
import { Entrenador } from '../../modelos/Entrenador';
import { DisciplinaService } from '../../servicios/disciplina.service';
import { Disciplina } from '../../modelos/Disciplina';

@Component({
  selector: 'app-entrenadores-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrenadores-list.component.html',
  styleUrls: ['./entrenadores-list.component.css']
})
export class EntrenadoresListComponent implements OnInit {
  entrenadores: Entrenador[] = [];
  entrenadoresFiltrados: Entrenador[] = [];
  terminoBusqueda: string = '';
  disciplinas: Disciplina[] = [];

  constructor(
    private entrenadorService: EntrenadorService,
    private disciplinaService: DisciplinaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDisciplinas();
    this.obtenerEntrenadores();
  }

  cargarDisciplinas(): void {
    this.disciplinaService.getDisciplinas().subscribe(
      data => this.disciplinas = data,
      err => console.error('Error al cargar disciplinas', err)
    );
  }

  obtenerNombreDisciplina(idDisciplinas: string): string {
    const disciplina = this.disciplinas.find(d => d.idDisciplinas === idDisciplinas);
    return disciplina ? disciplina.nombreDisciplina : 'No especificada';
  }

  obtenerEntrenadores(): void {
    this.entrenadorService.getEntrenadores().subscribe(
      (res: Entrenador[]) => {
        this.entrenadores = res;
        this.entrenadoresFiltrados = res;
      },
      err => console.error(err)
    );
  }

  filtrarEntrenadores(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.entrenadoresFiltrados = this.entrenadores;
    } else {
      this.entrenadoresFiltrados = this.entrenadores.filter(e =>
        e.nombreEntrenador?.toLowerCase().startsWith(termino) ||
        e.apellidoPaterno?.toLowerCase().startsWith(termino) ||
        e.apellidoMaterno?.toLowerCase().startsWith(termino) ||
        e.especialidad?.toLowerCase().startsWith(termino)
      );
    }
  }

  borrarEntrenador(idEntrenadores: string): void {
    Swal.fire({
      title: '¿Seguro que deseas eliminar este entrenador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entrenadorService.deleteEntrenador(idEntrenadores).subscribe(
          res => {
            this.obtenerEntrenadores();
            Swal.fire('¡Eliminado!', 'El entrenador ha sido eliminado.', 'success');
          },
          err => Swal.fire('Error', 'No se pudo eliminar el entrenador.', 'error')
        );
      }
    });
  }

  editarEntrenador(idEntrenadores: string): void {
    this.router.navigate(['/entrenadores/actualizar', idEntrenadores]);
  }

  cancelar(): void {
    this.router.navigate(['/entrenadores']);
  }
}
