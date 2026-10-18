import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inscripcion } from '../modelos/Inscripcion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  //Crear una propiedad donde este la ruta
  API_URI = 'http://localhost:3000/app';
  //Instacia para la propiedad http
  constructor(private http: HttpClient) { }

  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.API_URI}/inscripciones`);
  }

  getInscripcion(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.API_URI}/inscripciones/${id}`);
  }

  createInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(`${this.API_URI}/inscripciones`, inscripcion);
  }

  deleteInscripcion(id: number): Observable<any> {
    return this.http.delete(`${this.API_URI}/inscripciones/${id}`);
  }

  updateInscripcion(id: number, updateInscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.put<Inscripcion>(`${this.API_URI}/inscripciones/${id}`, updateInscripcion);
  }
  inscribirMiembroEnDisciplina(data: any) {
    return this.http.post(`${this.API_URI}/miembrosDisciplinas`, data);
  }

  inscribirMiembroEnEvento(data: any) {
    return this.http.post(`${this.API_URI}/miembrosEventosDeportivo`, data);
  }

}