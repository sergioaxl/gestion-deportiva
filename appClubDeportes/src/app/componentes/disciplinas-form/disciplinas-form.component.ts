import { Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Disciplina } from '../../modelos/Disciplina';
import { DisciplinaService } from '../../servicios/disciplina.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disciplinas-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './disciplinas-form.component.html',
  styleUrls: ['./disciplinas-form.component.css']
})
export class DisciplinasFormComponent {
  @HostBinding('class') classes = 'row';

  disciplina: Disciplina = {
    idDisciplinas: '',
    nombreDisciplina: '',
    nivel: '',
    imagen: '',
    descripcion: '',
    duracion: 0,
    costo: 0,
    categoria: '',
    ubicacion: ''
  };

  edit: boolean = false;

  errores: { [key: string]: string } = {};

  constructor(
    private disciplinaService: DisciplinaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['idDisciplinas']) {
      this.disciplinaService.getDisciplina(params['idDisciplinas']).subscribe(
        res => {
          this.disciplina = res;
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }

validarCampos(): boolean {
  this.errores = {};
  let valido = true;

// ID de Disciplina — debe tener 6 caracteres: 3 letras y 3 números
if (!this.disciplina.idDisciplinas) {
  this.errores['idDisciplinas'] = 'El ID es obligatorio.';
  valido = false;
} else if (!/^[A-Z]{3}[0-9]{3}$/.test(this.disciplina.idDisciplinas)) {
  this.errores['idDisciplinas'] = 'Formato inválido. Debe tener 3 letras seguidas de 3 números (ejemplo: FUT001).';
  valido = false;
}


  // Nombre
  if (!this.disciplina.nombreDisciplina || this.disciplina.nombreDisciplina.length > 45) {
    this.errores['nombreDisciplina'] = 'Nombre obligatorio, máximo 45 caracteres.';
    valido = false;
  }

  // Nivel
  if (!this.disciplina.nivel || this.disciplina.nivel.length > 45) {
    this.errores['nivel'] = 'Nivel obligatorio, máximo 45 caracteres.';
    valido = false;
  }

// Imagen
if (
  this.disciplina.imagen &&
  !/^https?:\/\/.+/.test(this.disciplina.imagen) && // URL válida
  !/^data:image\/[a-zA-Z]+;base64,/.test(this.disciplina.imagen) // Base64 válida
) {
  this.errores['imagen'] = 'Debe ser una URL o una imagen en Base64 válida.';
  valido = false;
}


// Duración
if (this.disciplina.duracion == null || this.disciplina.duracion < 0) {
  this.errores['duracion'] = 'Duración positiva requerida.';
  valido = false;
}

// Costo
if (this.disciplina.costo == null || this.disciplina.costo < 0) {
  this.errores['costo'] = 'Costo positivo requerido.';
  valido = false;
}


  // Categoría
  if (!this.disciplina.categoria || this.disciplina.categoria.length > 45) {
    this.errores['categoria'] = 'Categoría obligatoria, máximo 45 caracteres.';
    valido = false;
  }

  // Ubicación
  if (!this.disciplina.ubicacion || this.disciplina.ubicacion.length > 100) {
    this.errores['ubicacion'] = 'Ubicación obligatoria, máximo 100 caracteres.';
    valido = false;
  }

  return valido;
}


  submitDisciplina() {
    if (this.validarCampos()) {
      this.edit ? this.actualizaDisciplina() : this.addDisciplina();
    }
  }

  addDisciplina() {
    this.disciplinaService.createDisciplina(this.disciplina).subscribe(
      res => this.router.navigate(['disciplinas']),
      err => console.error(err)
    );
  }

  actualizaDisciplina() {
    const params = this.activatedRoute.snapshot.params;
    this.disciplinaService.updateDisciplina(params['idDisciplinas'], this.disciplina).subscribe(
      res => this.router.navigate(['/disciplinas']),
      err => console.error(err)
    );
  }
  
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
      this.disciplina.imagen = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
}
