import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultar-reserva',
  templateUrl: './consultar-reserva.component.html',
  styleUrls: ['./consultar-reserva.component.css']
})
export class ConsultarReservaComponent {
  reserva: any = null;
  apiUrl = 'http://localhost:3000/reservas';

  constructor(private http: HttpClient) {}

  buscarReserva(codigo: string) {
    this.http.get<any[]>(`${this.apiUrl}?codigo=${codigo}`).subscribe(
      (data) => {
        this.reserva = data.length ? data[0] : null;
      },
      (error) => {
        console.error('Erro ao buscar reserva', error);
      }
    );
  }

  cancelarReserva(codigo: string) {
    //testar delete da api
    console.log('Reserva cancelada');
  }
}
