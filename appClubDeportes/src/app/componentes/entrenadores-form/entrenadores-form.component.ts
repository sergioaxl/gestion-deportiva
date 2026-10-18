import { Component, HostBinding, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { EntrenadorService } from '../../servicios/entrenador.service';
import { DisciplinaService } from '../../servicios/disciplina.service';
import { Entrenador } from '../../modelos/Entrenador';
import { Disciplina } from '../../modelos/Disciplina';

@Component({
  selector: 'app-entrenadores-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrenadores-form.component.html',
  styleUrls: ['./entrenadores-form.component.css']
})
export class EntrenadoresFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  entrenador: Entrenador = {
    idEntrenadores: '',
    nombreEntrenador: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    fechaNacimiento: new Date(),
    especialidad: '',
    direccion: '',
    correo: '',
    telefono: 0,
    idDisciplinas: '',
    imagen: ''
  };

  disciplinas: Disciplina[] = [];
  edit: boolean = false;
  errores: { [key: string]: string } = {};

  constructor(
    private entrenadorService: EntrenadorService,
    private router: Router,
    private disciplinaService: DisciplinaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarDisciplinas();
    const params = this.activatedRoute.snapshot.params;
    if (params['idEntrenadores']) {
      this.entrenadorService.getEntrenador(params['idEntrenadores']).subscribe(
        res => {
          this.entrenador = res;
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }

  cargarDisciplinas(): void {
    this.disciplinaService.getDisciplinas().subscribe(
      data => this.disciplinas = data,
      error => console.error('Error al cargar disciplinas', error)
    );
  }

  validarCampos(): boolean {
    this.errores = {};
    let valido = true;

    // ID de Entrenador — 5 letras seguidas de 3 números
    if (!this.entrenador.idEntrenadores) {
      this.errores['idEntrenadores'] = 'El ID es obligatorio.';
      valido = false;
    } else if (!/^[A-Z]{5}[0-9]{3}$/.test(this.entrenador.idEntrenadores)) {
      this.errores['idEntrenadores'] = 'Formato inválido. Debe tener 5 letras seguidas de 3 números (ejemplo: ABOYT123).';
      valido = false;
    }


    if (!this.entrenador.nombreEntrenador || this.entrenador.nombreEntrenador.length > 45) {
      this.errores['nombreEntrenador'] = 'Nombre obligatorio, máximo 45 caracteres.';
      valido = false;
    }

    if (!this.entrenador.apellidoPaterno || this.entrenador.apellidoPaterno.length > 45) {
      this.errores['apellidoPaterno'] = 'Apellido Paterno obligatorio, máximo 45 caracteres.';
      valido = false;
    }

    if (!this.entrenador.apellidoMaterno || this.entrenador.apellidoMaterno.length > 45) {
      this.errores['apellidoMaterno'] = 'Apellido Materno obligatorio, máximo 45 caracteres.';
      valido = false;
    }

    if (!this.entrenador.sexo) {
      this.errores['sexo'] = 'Seleccione un sexo.';
      valido = false;
    }

    if (!this.entrenador.fechaNacimiento) {
      this.errores['fechaNacimiento'] = 'Fecha de nacimiento obligatoria.';
      valido = false;
    }

    if (!this.entrenador.especialidad || this.entrenador.especialidad.length > 45) {
      this.errores['especialidad'] = 'Especialidad obligatoria, máximo 45 caracteres.';
      valido = false;
    }

    if (!this.entrenador.correo || !/^\S+@\S+\.\S+$/.test(this.entrenador.correo)) {
      this.errores['correo'] = 'Correo electrónico inválido.';
      valido = false;
    }

if (this.entrenador.telefono == null || this.entrenador.telefono <= 0) {
  this.errores['telefono'] = 'Teléfono positivo requerido.';
  valido = false;
}


    if (!this.entrenador.direccion || this.entrenador.direccion.length > 100) {
      this.errores['direccion'] = 'Dirección obligatoria, máximo 100 caracteres.';
      valido = false;
    }

    if (!this.entrenador.idDisciplinas) {
      this.errores['idDisciplinas'] = 'Seleccione una disciplina.';
      valido = false;
    }

// Imagen
if (
  this.entrenador.imagen &&
  !/^https?:\/\/.+/.test(this.entrenador.imagen) && // URL válida
  !/^data:image\/[a-zA-Z]+;base64,/.test(this.entrenador.imagen) // Base64 válida
) {
  this.errores['imagen'] = 'Debe ser una URL o una imagen en Base64 válida.';
  valido = false;
}


    return valido;
  }

  submitEntrenador() {
    if (this.validarCampos()) {
      this.edit ? this.actualizaEntrenador() : this.addEntrenador();
    }
  }

  addEntrenador() {
    const entrenadorAEnviar: any = { ...this.entrenador };
    if (entrenadorAEnviar.fechaNacimiento) {
      entrenadorAEnviar.fechaNacimiento = new Date(entrenadorAEnviar.fechaNacimiento).toISOString().split('T')[0];
    }

    this.entrenadorService.createEntrenador(entrenadorAEnviar).subscribe(
      res => {
        alert('✅ Entrenador agregado correctamente');
        this.router.navigate(['/entrenadores']);
      },
      err => {
        alert('❌ Error al agregar entrenador');
        console.error(err);
      }
    );
  }

  actualizaEntrenador() {
    const params = this.activatedRoute.snapshot.params;
    const entrenadorAEnviar: any = { ...this.entrenador };
    if (entrenadorAEnviar.fechaNacimiento) {
      entrenadorAEnviar.fechaNacimiento = new Date(entrenadorAEnviar.fechaNacimiento).toISOString().split('T')[0];
    }

    this.entrenadorService.updateEntrenador(params['idEntrenadores'], entrenadorAEnviar).subscribe(
      res => {
        
        this.router.navigate(['/entrenadores']);
      },
      err => {
        
        console.error(err);
      }
    );
  }

  get nombreDisciplinaSeleccionada(): string {
    const disciplina = this.disciplinas.find(d => d.idDisciplinas === this.entrenador.idDisciplinas);
    return disciplina ? disciplina.nombreDisciplina || 'Nombre no disponible' : 'No especificada';
  }
  //Boton de cancelar he
  cancelar(): void {
  this.router.navigate(['/menu']);
}
RegresarLista(): void {
  this.router.navigate(['/menu']);
}
onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      // Guardamos el Base64 para previsualización y envío
      this.entrenador.imagen = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
}
