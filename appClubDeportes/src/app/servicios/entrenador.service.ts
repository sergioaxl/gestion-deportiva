import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrenador } from '../modelos/Entrenador';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
API_URI = 'http://localhost:3000/app';

constructor(private http: HttpClient) {}

getEntrenadores(): Observable<Entrenador[]> {
  return this.http.get<Entrenador[]>(`${this.API_URI}/entrenadores`);
}

getEntrenador(id: string): Observable<Entrenador> {
  return this.http.get<Entrenador>(`${this.API_URI}/entrenadores/${id}`);
}

createEntrenador(entrenador: Entrenador): Observable<Entrenador> {
  return this.http.post<Entrenador>(`${this.API_URI}/entrenadores`, entrenador);
}

deleteEntrenador(id: string): Observable<any> {
  return this.http.delete(`${this.API_URI}/entrenadores/${id}`);
}

updateEntrenador(id: string, updateEntrenador: Entrenador): Observable<Entrenador> {
  return this.http.put<Entrenador>(`${this.API_URI}/entrenadores/${id}`, updateEntrenador);
}

}
