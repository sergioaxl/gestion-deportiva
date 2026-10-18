import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
import { DisciplinaService } from '../../servicios/disciplina.service';  
import { Disciplina } from '../../modelos/Disciplina';                   
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-disciplinas-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './disciplinas-list.component.html',
  styleUrls: ['./disciplinas-list.component.css']
})
export class DisciplinasListComponent implements OnInit {
  disciplinas: Disciplina[] = [];
  disciplinasFiltradas: Disciplina[] = [];
  terminoBusqueda: string = '';

  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.obtenerDisciplinas();
  }

  obtenerDisciplinas(): void {
    this.disciplinaService.getDisciplinas().subscribe(
      (res: Disciplina[]) => {
        this.disciplinas = res;
        this.disciplinasFiltradas = res;
      },
      err => console.error(err)
    );
  }

  filtrarDisciplinas(): void {
  const termino = this.terminoBusqueda.toLowerCase().trim();
  if (!termino) {
    this.disciplinasFiltradas = this.disciplinas;
  } else {
    this.disciplinasFiltradas = this.disciplinas.filter(d =>
      d.nombreDisciplina?.toLowerCase().startsWith(termino)
    );
  }
}


borrarDisciplina(idDisciplinas: string): void {
  if (!idDisciplinas) return;

  // Usamos SweetAlert2 con animación
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta disciplina será eliminada permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    showClass: {
      popup: 'animate__animated animate__bounceIn'
    },
    hideClass: {
      popup: 'animate__animated animate__bounceOut'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.disciplinaService.deleteDisciplina(idDisciplinas).subscribe(
        res => {
          Swal.fire({
            title: '¡Eliminado!',
            text: 'La disciplina ha sido eliminada correctamente.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
              popup: 'animate__animated animate__zoomIn'
            },
            hideClass: {
              popup: 'animate__animated animate__zoomOut'
            }
          });
          this.obtenerDisciplinas();
        },
        err => {
          console.error('Error al eliminar disciplina:', err);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al eliminar la disciplina. Esta Disciplina ya cuenta con miembros',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            showClass: {
              popup: 'animate__animated animate__shakeX'
            }
          });
        }
      );
    }
  });
}

}
