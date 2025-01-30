import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../service/request.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgendamentoModel } from '../model/filtro-agendamento.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filtroAgendamento = {} as AgendamentoModel;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    interval(100).subscribe(() => {
      this.validFields();
    });
  }

  createRequest(): void {

    if (!this.validFields()) {
      Swal.fire('Aviso', 'É obrigatório preencher todos os campos.', 'info');
      return;
    }

    this.requestService.createRequest(this.filtroAgendamento).subscribe({
      next: (data) => {
        console.log('Dados recebidos: ', data);
      },
      error: (error) => {
        Swal.fire('Erro', 'Erro ao solicitar agendamento.', 'error');
        console.error('rro ao solicitar agendamento: ', error);
      },
      complete: () => {}
    });
  }
  
  validFields(): boolean {
    if (!this.filtroAgendamento.nomeUsuario) {
      return false;
    }

    if (!this.filtroAgendamento.documentoUsuario) {
      return false;
    }

    if (!this.filtroAgendamento.contaOrigem) {
      return false;
    }

    if (!this.filtroAgendamento.contaDestino) {
      return false;
    }

    if (!this.filtroAgendamento.valorTransferencia) {
      return false;
    }

    if (!this.filtroAgendamento.dataHoraTransferencia) {
      return false;
    }

    return true;
  }

  clear() {
    this.filtroAgendamento = {} as AgendamentoModel;
  }
}