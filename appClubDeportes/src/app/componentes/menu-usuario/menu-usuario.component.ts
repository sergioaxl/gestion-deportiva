import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { DisciplinaService } from '../../servicios/disciplina.service';
import { EventoDeportivoService } from '../../servicios/evento-deportivo.service';
import { InscripcionService } from '../../servicios/inscripcion.service'
import { UsuarioService } from '../../servicios/usuario.service';
import { MiembroService } from '../../servicios/miembro.service';
import { Disciplina, EventoDeportivo, Inscripcion, Miembro, MiembroEventoDeportivo } from '../../modelos';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; // 🔹 Agregar este import arriba


@Component({
  selector: 'app-menu-usuario',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit {

  miembro: any;
  totalDisciplinas: number = 0;
  totalEventos: number = 0;
  totalInscripciones: number = 0;
  totalSesiones: number = 0;
  horasEntrenamiento: number = 0;
  progreso: number = 0;
  disciplinas: any[] = [];
  eventos: any[] = [];
  actividades: any[] = [];
  idMiembro: string | null = null;
 disciplinasInscritas: any[] = [];
  eventosAsistidos: any[] = [];
  todasDisciplinas: any[] = [];
  todosEventos: any[] = [];

  userData: any;
  menuActivo = 'dashboard';

  // 🟢 NUEVAS VARIABLES AGREGADAS
  nombreUsuario: string | null = null;
  rolUsuario: string | null = null;

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private router: Router,
    private miembroService: MiembroService,
    private disciplinasService: DisciplinaService,
    private eventoService: EventoDeportivoService,
    private inscripcionesService: InscripcionService,
  ) {}

 ngOnInit(): void {
  this.idMiembro = localStorage.getItem('idMiembro');
  this.nombreUsuario = localStorage.getItem('nombre');
  this.rolUsuario = localStorage.getItem('rol');

  if (!this.idMiembro) {
    this.router.navigate(['/login']);
    return;
  }

  this.cargarDatosMiembro();

  // Primero carga inscripciones del usuario
  this.cargarDisciplinas();
  this.cargarEventos(this.idMiembro);

  // Luego carga todas (para filtrar correctamente)
  setTimeout(() => {
    this.cargarTodasDisciplinas();
    this.cargarTodosEventos();
  }, 400);
}

  
  // 🔹 Verifica si el miembro ya está inscrito en una disciplina
  estaInscritoDisciplina(idDisciplina: number): boolean {
    return this.disciplinasInscritas?.some(d => +d.idDisciplinas === idDisciplina);
  }

  // 🔹 Verifica si el miembro ya participa en un evento
  estaInscritoEvento(idEvento: number): boolean {
    return this.eventosAsistidos?.some(e => +e.idEventoDeportivo === idEvento);
  }

  // 🔹 Cargar TODAS las disciplinas (no solo las inscritas)
  cargarTodasDisciplinas(): void {
    this.disciplinasService.getDisciplinas().subscribe({
      next: (data) => {
        this.todasDisciplinas = data;
        console.log('📚 Todas las disciplinas:', this.todasDisciplinas);
        this.cargarDisciplinas();
      },
      error: (err) => {
        console.error('❌ Error al obtener todas las disciplinas:', err);
      }
    });
  }

  // 🔹 Cargar TODOS los eventos (no solo los inscritos)
  cargarTodosEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (data) => {
        this.todosEventos = data;
        console.log('📅 Todos los eventos:', this.todosEventos);
        this.cargarEventos(this.idMiembro!);
      },
      error: (err) => {
        console.error('❌ Error al obtener todos los eventos:', err);
      }
    });
  }


  cargarDatosMiembro(): void {
    this.miembroService.getMiembro(this.idMiembro!).subscribe({
      next: (data) => {
        this.miembro = data as Miembro;
      },
      error: (err) => console.error('Error al obtener miembro:', err)
    });
  }
  navigateToProfileUpdate(): void {
    // Obtener el ID del usuario logeado (aquí deberías usar el ID real)
    const userId = this.idMiembro; // o el ID real del usuario
    this.router.navigate(['/configurar/actualizar', userId]);
  }

  cargarDisciplinas(): void {
    if (!this.idMiembro) return;

    this.usuarioService.getDisciplinasPorMiembro(this.idMiembro).subscribe({
      next: (disciplinas) => {
        this.disciplinasInscritas = disciplinas;
        console.log('📋 Disciplinas inscritas:', this.disciplinasInscritas);
      },
      error: (err) => {
        console.error('Error al obtener disciplinas del miembro:', err);
      }
    });
  }


  cargarEventos(idMiembro: string) {
    this.usuarioService.getEventosPorMiembro(idMiembro).subscribe({
      next: (data) => {
        this.eventosAsistidos = data;
        console.log('Eventos del miembro:', data);
      },
      error: (err) => {
        console.error('Error al cargar eventos', err);
      }
    });
  }


  // ✅ MÉTODO LOGOUT MEJORADO (manteniendo el tuyo)
  logout() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu sesión actual se cerrará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('🚪 Cerrando sesión de usuario:', this.nombreUsuario || this.idMiembro);

        // Elimina todos los datos guardados del usuario logueado
        localStorage.removeItem('idMiembro');
        localStorage.removeItem('nombre');
        localStorage.removeItem('rol');

        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });

        // Redirige después de un pequeño delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      }
    });
  }
// 🔹 Método para inscribirse en una disciplina
inscribirseDisciplina(idDisciplina: string | number) {
  // Encontrar la disciplina para mostrar su nombre en el mensaje
  const disciplina = this.todasDisciplinas.find(d => d.idDisciplinas == idDisciplina);
  const nombreDisciplina = disciplina?.nombreDisciplina || 'esta disciplina';

  Swal.fire({
    title: '¿Confirmar inscripción?',
    html: `¿Estás seguro que quieres formar parte de <strong>${nombreDisciplina}</strong>?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, inscribirme',
    cancelButtonText: 'Cancelar',
    backdrop: true,
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
      const idMiembro = localStorage.getItem('idMiembro');
      
      if (!idMiembro || !idDisciplina) {
        Swal.fire('Error', 'Faltan datos para inscribirse', 'error');
        return;
      }

      const inscripcion = {
        idMiembros: idMiembro,
        idDisciplinas: idDisciplina
      };

      this.http.post('http://localhost:3000/app/inscripciones', inscripcion)
        .subscribe({
          next: (res: any) => {
            console.log('✅ Inscripción exitosa:', res);
            Swal.fire({
              title: '¡Inscripción exitosa!',
              text: `Te has inscrito en ${nombreDisciplina}`,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              timer: 2000,
              showConfirmButton: true
            });
            this.cargarDisciplinas();
            // Recargar todas las disciplinas para actualizar la lista de disponibles
            setTimeout(() => {
              this.cargarTodasDisciplinas();
            }, 500);
          },
          error: (err: any) => {
            console.error('❌ Error al inscribirse:', err);
            Swal.fire('Error', 'Hubo un error al inscribirse', 'error');
          }
        });
    }
  });
}

// 🔹 Método para inscribirse en un evento
inscribirseEvento(idEvento: number): void {
  // Encontrar el evento para mostrar su nombre en el mensaje
  const evento = this.todosEventos.find(e => e.idEventoDeportivo == idEvento);
  const nombreEvento = evento?.nombreEvento || 'este evento';

  Swal.fire({
    title: '¿Confirmar participación?',
    html: `¿Estás seguro que quieres formar parte del evento <strong>${nombreEvento}</strong>?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, participar',
    cancelButtonText: 'Cancelar',
    backdrop: true,
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
      if (!this.idMiembro) {
        Swal.fire('Error', 'No se encontró el ID del miembro logueado.', 'error');
        return;
      }

      const body = {
        Miembros_idMiembros: this.idMiembro,
        EventoDeportivo_idEventoDeportivo: idEvento
      };
      this.inscripcionesService.inscribirMiembroEnEvento(body).subscribe({
        next: (res) => {
          Swal.fire({
            title: '¡Inscripción exitosa!',
            text: `Te has inscrito en el evento ${nombreEvento}`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 2000,
            showConfirmButton: true
          });
          this.cargarEventos(this.idMiembro!);
          // Recargar todos los eventos para actualizar la lista de disponibles
          setTimeout(() => {
            this.cargarTodosEventos();
          }, 500);
        },
        error: (err) => {
          console.error('Error al inscribirse en el evento:', err);
          Swal.fire('Error', 'No se pudo inscribirte en el evento.', 'error');
        }
      });
    }
  });
}

getDisciplinasDisponibles(): any[] {
  if (!this.todasDisciplinas.length) return [];
  if (!this.disciplinasInscritas.length) return this.todasDisciplinas;

  const disponibles = this.todasDisciplinas.filter(
    d => !this.disciplinasInscritas.some(di => di.idDisciplinas == d.idDisciplinas)
  );

  return disponibles;
}


getEventosDisponibles(): any[] {
  if (!this.todosEventos.length) return [];
  if (!this.eventosAsistidos.length) return this.todosEventos;

  const disponibles = this.todosEventos.filter(
    e => !this.eventosAsistidos.some(ev => ev.idEventoDeportivo == e.idEventoDeportivo)
  );

  return disponibles;
}


}