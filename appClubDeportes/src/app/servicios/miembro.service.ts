import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Miembro } from '../modelos/Miembro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiembroService {
  //Crear una propiedad donde este la ruta
  API_URI = 'http://localhost:3000/app';
  //Instacia para la propiedad http
  constructor(private http: HttpClient) { }

  getMiembros(): Observable<Miembro[]> {
    return this.http.get<Miembro[]>(`${this.API_URI}/miembros`);
  }
  getMiembro(codigo: string) {
    return this.http.get(`${this.API_URI}/miembros/${codigo}`);
  }
  createMiembro(producto: Miembro) {
    return this.http.post(`${this.API_URI}/miembros`, producto)
  }
  deleteMiembro(codigo: string) {
    return this.http.delete(`${this.API_URI}/miembros/${codigo}`);
  }
  updateMiembro(codigo: string, updateProducto: Miembro): Observable<Miembro> {
    return this.http.put(`${this.API_URI}/miembros/${codigo}`, updateProducto);
  }

  checkCorreoUnico(correo: string) {
    return this.http.post<{ exists: boolean }>('/api/miembros/verificar-correo', { correoMiembro: correo });
  }


}
