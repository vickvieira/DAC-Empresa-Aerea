import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importar o ReactiveFormsModule


@Component({
  selector: 'app-aut-cad',
  templateUrl: './aut-cad.component.html',
  styleUrls: ['./aut-cad.component.css']
})
export class AutCadComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // CPF com 11 dígitos
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ruaNumero: ['', Validators.required],
      complemento: [''],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]], // CEP no formato 00000-000
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Formulário enviado', this.formGroup.value);
    } else {
      console.log('Formulário inválido');
    }
  }
}