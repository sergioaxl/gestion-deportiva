import { Component, HostBinding, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MiembroEventoDeportivo } from '../../modelos/MiembroEventoDeportivo';
import { MiembroEventoDeportivoService } from '../../servicios/miembro-evento-deportivo.service';
import { MiembroService } from '../../servicios/miembro.service';
import { EventoDeportivoService } from '../../servicios/evento-deportivo.service';
import { CommonModule } from '@angular/common';
import { Miembro } from '../../modelos';

@Component({
  selector: 'app-configurarperfil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './configurarperfil.component.html',
  styleUrls: ['./configurarperfil.component.css']
})
export class ConfigurarperfilComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  
    miembro: Miembro = {
      idMiembros: '',
      nombreMiembros: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      sexo: '',
      fechaNacimiento: new Date(),
      categoria: '',
      direccion: '',
      correoMiembro: '',
      telefono: 0,
      imagen: ''
    };
  
    miembros: Miembro[] = [];
    edit: boolean = false;
  
    errores: { [key: string]: string } = {};
  
    constructor(
      private miembroService: MiembroService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) {}
  
    ngOnInit(): void {
      this.cargarMiembros();
  
      const params = this.activatedRoute.snapshot.params;
      if (params['idMiembros']) {
        this.miembroService.getMiembro(params['idMiembros']).subscribe(
          res => {
            this.miembro = res;
            this.edit = true;
          },
          err => console.error(err)
        );
      }
    }
  
    cargarMiembros(): void {
      this.miembroService.getMiembros().subscribe(
        res => this.miembros = res,
        err => console.error('Error al cargar miembros:', err)
      );
    }
  
    validarCampos(): boolean {
      this.errores = {};
      let valido = true;
  
    // ID — debe tener 13 caracteres: 6 letras y 7 números
    if (!this.miembro.idMiembros) {
      this.errores['idMiembros'] = 'El ID es obligatorio.';
      valido = false;
    } else if (!/^[A-Z]{6}[0-9]{7}$/.test(this.miembro.idMiembros)) {
      this.errores['idMiembros'] = 'Formato inválido. Debe tener 6 letras seguidas de 7 números (ejemplo: ABCDEF1234567).';
      valido = false;
    }
  
      // Nombre
      if (!this.miembro.nombreMiembros || this.miembro.nombreMiembros.length > 45) {
        this.errores['nombreMiembros'] = 'Nombre obligatorio, máximo 45 caracteres.';
        valido = false;
      }
  
      // Apellido Paterno
      if (!this.miembro.apellidoPaterno || this.miembro.apellidoPaterno.length > 45) {
        this.errores['apellidoPaterno'] = 'Apellido Paterno obligatorio, máximo 45 caracteres.';
        valido = false;
      }
  
      // Apellido Materno
      if (!this.miembro.apellidoMaterno || this.miembro.apellidoMaterno.length > 45) {
        this.errores['apellidoMaterno'] = 'Apellido Materno obligatorio, máximo 45 caracteres.';
        valido = false;
      }
  
      // Sexo
      if (!this.miembro.sexo || this.miembro.sexo.length > 15) {
        this.errores['sexo'] = 'Sexo obligatorio, máximo 15 caracteres.';
        valido = false;
      }
  
      // Fecha
      if (!this.miembro.fechaNacimiento) {
        this.errores['fechaNacimiento'] = 'Fecha de nacimiento obligatoria.';
        valido = false;
      }
  
      // Categoría
      if (!this.miembro.categoria || this.miembro.categoria.length > 45) {
        this.errores['categoria'] = 'Categoría obligatoria, máximo 45 caracteres.';
        valido = false;
      }
  
      // Dirección
      if (!this.miembro.direccion || this.miembro.direccion.length > 100) {
        this.errores['direccion'] = 'Dirección obligatoria, máximo 100 caracteres.';
        valido = false;
      }
  
      // Correo
      if (this.miembro.correoMiembro && !/^\S+@\S+\.\S+$/.test(this.miembro.correoMiembro)) {
        this.errores['correoMiembro'] = 'Correo inválido.';
        valido = false;
      }
  
      // Teléfono
      if (this.miembro.telefono == null || this.miembro.telefono <= 0) {
        this.errores['telefono'] = 'Teléfono positivo requerido.';
        valido = false;
      }
  
      // Imagen
      if (this.miembro.imagen) {
        const esURL = /^https?:\/\/.+/.test(this.miembro.imagen);
        const esBase64 = this.miembro.imagen.startsWith('data:image/');
        if (!esURL && !esBase64) {
          this.errores['imagen'] = 'La imagen debe ser una URL válida o un archivo de imagen.';
          valido = false;
        }
      }
  
  
      return valido;
    }
  
  addMiembro() {
    if (this.validarCampos() && !this.errores['correoMiembro']) {
      // Convertir fecha al formato YYYY-MM-DD
      if (this.miembro.fechaNacimiento) {
        const fecha = new Date(this.miembro.fechaNacimiento);
        this.miembro.fechaNacimiento = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000)
          .toISOString()
          .split('T')[0] as any;
      }
  
      this.miembroService.createMiembro(this.miembro).subscribe(
        res => this.router.navigate(['miembros']),
        err => {
          console.error(err);
          if (err.error?.message === 'El correo ya está registrado') {
            this.errores['correoMiembro'] = err.error.message;
          }
        }
      );
    }
  }
  
  actualizaMiembro() {
    if (this.validarCampos()) {
      // 🔹 Igual conversión antes de actualizar
      if (this.miembro.fechaNacimiento) {
        const fecha = new Date(this.miembro.fechaNacimiento);
        this.miembro.fechaNacimiento = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000)
          .toISOString()
          .split('T')[0] as any;
      }
  
      const params = this.activatedRoute.snapshot.params;
      this.miembroService.updateMiembro(params['idMiembros'], this.miembro).subscribe(
        res => this.router.navigate(['/menuUser']),
        err => console.error(err)
      );
    }
  }
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Guardamos el Base64 para previsualización y envío
        this.miembro.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  
  
  Cancelar(): void {
    this.router.navigate(['/menuUser']);
  }
  
  RegresarLista(): void {
    this.router.navigate(['/menuUser']);
  }
  
  
  onCorreoChange() {
    // Solo verificar si hay texto
    if (this.miembro.correoMiembro) {
      this.miembroService.checkCorreoUnico(this.miembro.correoMiembro).subscribe(
        res => {
          if (res.exists) {
            this.errores['correoMiembro'] = "Este correo ya está en uso";
          } else {
            delete this.errores['correoMiembro'];
          }
        },
        err => console.error('Error al verificar correo', err)
      );
    }
  }
}
