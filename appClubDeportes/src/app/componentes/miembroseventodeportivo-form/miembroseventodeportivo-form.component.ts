import { Component, HostBinding, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MiembroEventoDeportivo } from '../../modelos/MiembroEventoDeportivo';
import { MiembroEventoDeportivoService } from '../../servicios/miembro-evento-deportivo.service';
import { MiembroService } from '../../servicios/miembro.service';
import { EventoDeportivoService } from '../../servicios/evento-deportivo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-miembroseventodeportivo-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './miembroseventodeportivo-form.component.html',
  styleUrls: ['./miembroseventodeportivo-form.component.css']
})
export class MiembroseventodeportivoFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  miembroEvento: MiembroEventoDeportivo = {
    Miembros_idMiembros: '',
    EventoDeportivo_idEventoDeportivo: 0
  };

  miembros: any[] = [];
  eventos: any[] = [];
  edit: boolean = false;
  errores: { [key: string]: string } = {};

  constructor(
    private miembroEventoService: MiembroEventoDeportivoService,
    private miembroService: MiembroService,
    private eventoService: EventoDeportivoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Cargar miembros y eventos
    this.miembroService.getMiembros().subscribe(res => this.miembros = res);
    this.eventoService.getEventos().subscribe(res => this.eventos = res);

    // Si es edición
    const params = this.activatedRoute.snapshot.params;
    if (params['idMiembrosEventoDeportivo']) {
      this.miembroEventoService.getMiembroEventoDeportivo(params['idMiembrosEventoDeportivo']).subscribe(
        res => {
          this.miembroEvento = res;
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }

  // Validación de campos
  validarCampos(): boolean {
    this.errores = {};
    let valido = true;

    if (!this.miembroEvento.Miembros_idMiembros) {
      this.errores['Miembros_idMiembros'] = 'Debe seleccionar un miembro.';
      valido = false;
    }

    if (!this.miembroEvento.EventoDeportivo_idEventoDeportivo) {
      this.errores['EventoDeportivo_idEventoDeportivo'] = 'Debe seleccionar un evento deportivo.';
      valido = false;
    }

    return valido;
  }

  addMiembroEvento(): void {
    if (!this.validarCampos()) return;

    this.miembroEventoService.createMiembroEventoDeportivo(this.miembroEvento).subscribe(
      res => this.router.navigate(['/miembrosEventosDeportivo']),
      err => console.error(err)
    );
  }

  updateMiembroEvento(): void {
    if (!this.validarCampos()) return;

    const params = this.activatedRoute.snapshot.params;
    this.miembroEventoService.updateMiembroEventoDeportivo(params['idMiembrosEventoDeportivo'], this.miembroEvento).subscribe(
      res => this.router.navigate(['/miembrosEventosDeportivo']),
      err => console.error(err)
    );
  }

  // Vista previa
  getNombreMiembro(id: string | undefined): string {
    const m = this.miembros.find(x => x.idMiembros === id);
    return m ? `${m.nombreMiembros} ${m.apellidoPaterno} ${m.apellidoMaterno}`.trim() : 'No especificado';
  }

getNombreEvento(id: any): string {
  if (!id) return 'No especificado';
  const e = this.eventos.find(x => String(x.idEventoDeportivo) === String(id));
  return e ? e.nombreEvento : 'No especificado';
}

cancelar(): void {
  this.router.navigate(['/menu']);
}

// Botón de regresar a la lista
regresar(): void {
  this.router.navigate(['/menu']);
}
}
