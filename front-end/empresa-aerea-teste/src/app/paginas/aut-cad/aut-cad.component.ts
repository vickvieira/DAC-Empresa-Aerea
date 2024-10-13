import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router'; // Importar Router
import { ToastrService } from 'ngx-toastr'; // Exemplo de serviço para mensagens (se estiver usando Toastr)

@Component({
  selector: 'app-aut-cad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aut-cad.component.html',
  styleUrls: ['./aut-cad.component.css']
})
export class AutCadComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private loginService: LoginService, private router: Router, private toastr: ToastrService){ // Injete o serviço de mensagens) {
    this.formGroup = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
      rua: ['', Validators.required],
      numero: ['', [Validators.required, Validators.pattern('^[0-9]+[a-zA-Z]?$')]],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      complemento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Formulário enviado', this.formGroup.value);
      
      this.loginService.adicionarUsuario(this.formGroup.value).subscribe(response => {
          // Exibir mensagem de sucesso
          this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
          // Redirecionar para a rota de login
           //this.router.navigate(['/login']);
          this.formGroup.reset();
      }, error => {
        console.error('Erro ao adicionar usuário:', error);
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}