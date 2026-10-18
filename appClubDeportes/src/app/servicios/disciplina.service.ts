import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disciplina } from '../modelos/Disciplina';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  // Ruta base para la API de disciplinas
  API_URI = 'http://localhost:3000/app';

  constructor(private http: HttpClient) { }

  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.API_URI}/disciplinas`);
  }

  getDisciplina(id: string): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.API_URI}/disciplinas/${id}`);
  }

  createDisciplina(disciplina: Disciplina): Observable<Disciplina> {
    return this.http.post<Disciplina>(`${this.API_URI}/disciplinas`, disciplina);
  }

  deleteDisciplina(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/disciplinas/${id}`);
  }

  updateDisciplina(id: string, updatedDisciplina: Disciplina): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${this.API_URI}/disciplinas/${id}`, updatedDisciplina);
  }
}
