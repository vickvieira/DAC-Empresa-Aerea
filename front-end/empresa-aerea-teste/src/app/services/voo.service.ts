import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voo } from '../models/voo.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VooService {

  private apiUrl = 'http://localhost:3000/voos';

  constructor(private http: HttpClient) {}
  
  buscarVoos(origem: string, destino: string): Observable<Voo[]> {
    let queryParams = '';
    if (origem) {
      queryParams += `&origem=${origem}`;
    }
    if (destino) {
      queryParams += `&destino=${destino}`;
    }
  
    // sem dataHora no parâmetro... por enquanto
    return this.http.get<Voo[]>(`${this.apiUrl}?${queryParams}`);
  }
  
  getVooByCodigo(codigo: string): Observable<Voo> {
    return this.http.get<Voo[]>(`http://localhost:3000/voos?codigo=${codigo}`)
      .pipe(
        map(voos => voos[0]) // Retorna o primeiro item do array
      );
  }

  // getVoosProximos(dataInicial: Date, dataFinal: Date): Observable<Voo[]> {
  //   const dataInicialStr = dataInicial.toISOString();
  //   const dataFinalStr = dataFinal.toISOString();
  //   return this.http.get<Voo[]>(`/api/voos?dataHora_gte=${dataInicialStr}&dataHora_lte=${dataFinalStr}`);
  // }
  getVoos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/voos');
  }
}  