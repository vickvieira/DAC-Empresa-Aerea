import { Routes } from '@angular/router';
import { HomeClienteComponent } from './paginas/cliente/home-cliente/home-cliente.component';
import { AutCadComponent } from './paginas/aut-cad/aut-cad.component';
import { ConsultarReservaComponent } from './paginas/consultar-reserva/consultar-reserva.component';
import { CadastroVooComponent } from './paginas/cadastro-voo/cadastro-voo.component';

export const routes: Routes = [
    { path: 'cliente/:id', component: HomeClienteComponent },
    { path: 'cadastrar', component: AutCadComponent},
    { path: 'consultar-reserva', component: ConsultarReservaComponent },
    { path: 'cadastro-voo', component: CadastroVooComponent },
];