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