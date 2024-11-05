import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Milhas } from '../models/milhas.model';
import { ExtratoMilhas } from '../models/extrato-milhas.model';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MilhasService {
  apiUrl = 'http://localhost:3000/milhas';
  apiUrlTransacoes = 'http://localhost:3000/transacoes_milhas';


  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  getMilhasByClienteId(clienteId: number): Observable<number> {
    return this.http.get<ExtratoMilhas[]>(`${this.apiUrl}?clienteId=${clienteId}`)
      .pipe(
        map(milhasArray => milhasArray.length > 0 ? milhasArray[0].saldo : 0)
      );
  }

  atualizarMilhas(clienteId: number, milhasDelta: number): Observable<Milhas> {
    // Primeiro, obter o saldo atual de milhas do cliente
    return this.http.get<Milhas[]>(`${this.apiUrl}?clienteId=${clienteId}`).pipe(
      switchMap((milhasArray: Milhas[]) => {
        if (milhasArray.length === 0) {
          throw new Error('Milhas do cliente não encontradas');
        }

        const milhasCliente = milhasArray[0];
        const novoSaldo = milhasCliente.saldo + milhasDelta;

        // Atualizar o saldo no servidor
        const milhasAtualizadas: Milhas = { ...milhasCliente, saldo: novoSaldo };
        return this.http.put<Milhas>(`${this.apiUrl}/${milhasCliente.clienteId}`, milhasAtualizadas);
      })
    );
  }

  /*
  getMilhasByClienteId(clienteId: number): Observable<number> {
    //return this.httpClient.get<number>(this.apiUrl+ "/"+ clienteId);
    return this.httpClient.get<number>(this.apiUrl);
  }
  */

  //precisa arrumar esse aqui ainda


  private log(message: string) {
    console.log(`erro: ${message}`);
  }



  getExtratoPorClienteId(term: string): Observable<ExtratoMilhas[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<ExtratoMilhas[]>(`${this.apiUrlTransacoes}/?clienteId=${term}`).pipe(
      tap(x => x.length),

    );
  }


  getTodosExtratos(): Observable<ExtratoMilhas[]> {
    return this.http.get<ExtratoMilhas[]>(this.apiUrlTransacoes, this.httpOption)
  }

  /*
  atualizarSaldo(transacaoMaisRecente: ExtratoMilhas) {
    //saldo anterior menos operação nova
    let body: Milhas;
    body.saldo = transacaoMaisRecente.saldo;    
    return this.http.put<Milhas[]>(this.apiUrl,)
  }
  */

  atualizarSaldoMilhas(novoSaldo: Milhas): Observable<Milhas>{
    return this.http.put<Milhas>(this.apiUrl, JSON.stringify(novoSaldo), 
      this.httpOption)
  }

  inserirCompraMilhas(extratoMilhas: ExtratoMilhas): Observable<ExtratoMilhas> {
   return this.http.post<ExtratoMilhas>(this.apiUrlTransacoes,
     JSON.stringify(extratoMilhas), this.httpOption)
  
  }

  // mais metodos

}
