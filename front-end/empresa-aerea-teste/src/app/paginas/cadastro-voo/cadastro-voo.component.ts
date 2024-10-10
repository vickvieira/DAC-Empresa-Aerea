import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-voo',
  standalone: true,
  imports: [],
  templateUrl: './cadastro-voo.component.html',
  styleUrl: './cadastro-voo.component.css'
})
export class CadastroVooComponent {
  valorPassagem: number = 0;

  calcularMilhas(valor: number): number {
    return valor / 5; // Regra de conversão: 1 milha a cada R$5.00
  }

  cadastrarVoo() {
    console.log("Falta coisa");
  }
}

