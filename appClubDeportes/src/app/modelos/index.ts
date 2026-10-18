export interface Disciplina {
  idDisciplinas: string;    
  nombreDisciplina: string;   
  nivel?: string;             
  imagen?: string;             
  descripcion?: string;       
  duracion?: number;           
  costo?: number;              
  categoria?: string;          
  ubicacion?: string;          
}

export interface Entrenador {
  idEntrenadores: string;
  nombreEntrenador?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  sexo?: string;
  fechaNacimiento?: Date;
  especialidad?: string;
  correo?: string;
  telefono?: number;
  direccion?: string;
  idDisciplinas: string;
  imagen?: string; 
}

export interface EventoDeportivo {
  idEventoDeportivo: number;
  nombreEvento?: string;
  fechaEvento?: Date;
  horaEvento?: string;      
  lugar?: string;
  descripcion?: string;
}

export interface Inscripcion {
  idInscripciones: number;
  idMiembros?: string;
  idDisciplinas?: string;
  fechaInscripcion?: Date;
}

export interface Miembro {
  idMiembros?: string;
  nombreMiembros?: string;
  apellidoPaterno?: string; 
  apellidoMaterno?: string;
  sexo?: string;
  fechaNacimiento?: Date;
  categoria?: string;
  direccion?: string;
  correoMiembro?: string;
  telefono?: number;
  imagen?: string;
}

export interface MiembroEventoDeportivo {
  idMiembrosEventoDeportivo?: number;
  Miembros_idMiembros: string;
  EventoDeportivo_idEventoDeportivo: number;
}
