import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-voo',
  templateUrl: './cadastro-voo.component.html',
  styleUrls: ['./cadastro-voo.component.css']
})
export class CadastroVooComponent {
  apiUrl = 'http://localhost:3000/voos';

  novoVoo = {
    codigo: '',
    dataHora: '',
    origem: '',
    destino: '',
    valorPassagem: 0,
    milhasNecessarias: 0
  };

  constructor(private http: HttpClient) {}

  cadastrarVoo() {
    this.http.post(this.apiUrl, this.novoVoo).subscribe(
      (response) => {
        console.log('Voo cadastrado com sucesso', response);
      },
      (error) => {
        console.error('Erro ao cadastrar voo', error);
      }
    );
  }
}
