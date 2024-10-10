import { Component } from '@angular/core';

@Component({
  selector: 'app-consultar-reserva',
  standalone: true,
  imports: [],
  templateUrl: './consultar-reserva.component.html',
  styleUrl: './consultar-reserva.component.css'
})
export class ConsultarReservaComponent {
  reserva: any = null;

  buscarReserva() {
      this.reserva = {
      dataHora: '2024-12-12 14:00',
      codigo: 'ABC123',
      origem: 'CWB',
      destino: 'GRU',
      valorGasto: 500,
      milhasGastas: 1000,
      estado: 'Confirmado',
      proximas48h: true  // Teste
    };
  }
 
  cancelarReserva() {
    console.log("Só para não dar erro na func");
  }
}
