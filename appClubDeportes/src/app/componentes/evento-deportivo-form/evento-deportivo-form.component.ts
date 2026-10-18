import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoDeportivoService } from '../../servicios/evento-deportivo.service';
import { EventoDeportivo } from '../../modelos/EventoDeportivo';

@Component({
  selector: 'app-evento-deportivo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evento-deportivo-form.component.html',
  styleUrls: ['./evento-deportivo-form.component.css']
})
export class EventoDeportivoFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  evento: EventoDeportivo = {
    idEventoDeportivo: 0,
    nombreEvento: '',
    fechaEvento: new Date(),
    horaEvento: '',
    lugar: '',
    descripcion: ''
  };

  edit: boolean = false;
  errores: { [key: string]: string } = {};

  constructor(
    private eventoService: EventoDeportivoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['idEventoDeportivo']) {
      this.eventoService.getEvento(+params['idEventoDeportivo'])
        .subscribe(
          res => {
            this.evento = { ...res };
            this.edit = true;
          },
          err => console.error('Error al obtener evento deportivo:', err)
        );
    }
  }

  validarCampos(): boolean {
    this.errores = {};
    let valido = true;

    // Nombre
    if (!this.evento.nombreEvento || this.evento.nombreEvento.length > 45) {
      this.errores['nombreEvento'] = 'Nombre obligatorio, máximo 45 caracteres.';
      valido = false;
    }

    // Fecha
    if (!this.evento.fechaEvento) {
      this.errores['fechaEvento'] = 'Fecha del evento obligatoria.';
      valido = false;
    }

    // Hora
    if (!this.evento.horaEvento) {
      this.errores['horaEvento'] = 'Hora del evento obligatoria.';
      valido = false;
    }

    // Lugar
    if (!this.evento.lugar || this.evento.lugar.length > 45) {
      this.errores['lugar'] = 'Lugar obligatorio, máximo 45 caracteres.';
      valido = false;
    }

    // Descripción
    if (this.evento.descripcion && this.evento.descripcion.length > 100) {
      this.errores['descripcion'] = 'Descripción máximo 100 caracteres.';
      valido = false;
    }

    return valido;
  }

  guardarEvento(): void {
    if (!this.validarCampos()) return;

    // Convertir fecha al formato YYYY-MM-DD
    if (this.evento.fechaEvento) {
      const fecha = new Date(this.evento.fechaEvento);
      this.evento.fechaEvento = fecha.toISOString().split('T')[0] as any;
    }

    if (this.edit && this.evento.idEventoDeportivo) {
      this.eventoService.updateEvento(this.evento.idEventoDeportivo, this.evento)
        .subscribe(
          res => this.router.navigate(['/eventos']),
          err => console.error('Error al actualizar evento:', err)
        );
    } else {
      this.eventoService.createEvento(this.evento)
        .subscribe(
          res => this.router.navigate(['/eventos']),
          err => console.error('Error al crear evento:', err)
        );
    }
  }
  //Boton cancelar 
  cancelar(): void {
    this.router.navigate(['/menu']);
  }

// Botón de regresar a la lista
regresar(): void {
  this.router.navigate(['/menu']);
}

}
