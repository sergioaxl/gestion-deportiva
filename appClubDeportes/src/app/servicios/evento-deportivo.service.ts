import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventoDeportivo } from '../modelos/EventoDeportivo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoDeportivoService {

  private API_URI = 'http://localhost:3000/app'; 

  getEventos(): Observable<EventoDeportivo[]> {
    return this.http.get<EventoDeportivo[]>(`${this.API_URI}/eventoDeportivo`);
  }

  getEvento(id: number): Observable<EventoDeportivo> {
    return this.http.get<EventoDeportivo>(`${this.API_URI}/eventoDeportivo/${id}`);
  }
  constructor(private http: HttpClient) {}
  createEvento(evento: EventoDeportivo): Observable<EventoDeportivo> {
    return this.http.post<EventoDeportivo>(`${this.API_URI}/eventoDeportivo`, evento);
  }

  updateEvento(id: number, eventoActualizado: EventoDeportivo): Observable<EventoDeportivo> {
    return this.http.put<EventoDeportivo>(`${this.API_URI}/eventoDeportivo/${id}`, eventoActualizado);
  }

  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.API_URI}/eventoDeportivo/${id}`);
  }
}
