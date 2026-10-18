import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disciplina, Inscripcion, EventoDeportivo, MiembroEventoDeportivo } from '../modelos';
import { Usuario } from '../modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = 'http://localhost:3000/app';

  constructor(private http: HttpClient) {}
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}/usuarios`);
  }

  // Obtener un usuario por ID
  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/usuarios/${id}`);
  }

  // Crear un nuevo usuario
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}/usuarios`, usuario);
  }

  // Eliminar un usuario por ID
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/usuarios/${id}`);
  }

  // Actualizar un usuario existente
  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/usuarios/${id}`, usuario);
  }

  // Disciplinas
  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.API_URL}/disciplinas`);
  }

  getInscripcionesPorMiembro(idMiembro: string): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.API_URL}/inscripciones/${idMiembro}`);
  }

  inscribirseDisciplina(inscripcion: Inscripcion): Observable<any> {
    return this.http.post(`${this.API_URL}/inscripciones`, inscripcion);
  }

  // Eventos
  getEventos(): Observable<EventoDeportivo[]> {
    return this.http.get<EventoDeportivo[]>(`${this.API_URL}/eventoDeportivo`);
  }

  getEventosPorMiembro(idMiembro: string) {
    return this.http.get<any[]>(`${this.API_URL}/miembrosEventosDeportivo/miembro/${idMiembro}`);
  }



  inscribirseEvento(inscripcion: MiembroEventoDeportivo): Observable<any> {
    return this.http.post(`${this.API_URL}/miembrosEventosDeportivo`, inscripcion);
  }

  getDisciplinasPorMiembro(idMiembro: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/inscripciones/miembro/${idMiembro}/disciplinas`);
  }
  
}
