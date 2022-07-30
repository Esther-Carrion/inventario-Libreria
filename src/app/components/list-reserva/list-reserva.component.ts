import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-list-reserva',
  templateUrl: './list-reserva.component.html',
  styleUrls: ['./list-reserva.component.css']
})
export class ListReservaComponent implements OnInit {

  reservas!:Reserva[];
  reserva:Reserva=new Reserva();
  constructor(private reservaService:ReservasService) { }

  ngOnInit(): void {
    this.reservaService.getAll().subscribe((r=>{this.reservas=r}));
  }

}