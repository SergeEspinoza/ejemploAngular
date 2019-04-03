import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Cliente= new Cliente()
  private titulo: string="Crear Cliente";

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit()
  {
     this.cargarCliente()
  }


   create():void{
  this.clienteService.create(this.cliente).subscribe(
    cliente => {
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente Nuevo', `Cliente ${cliente.nombre} creado con exito!`, 'success')
    }
  )
  }

   cargarCliente(): void{
    this.activatedRoute.params.subscribe( params =>{
        let id= params['id']
        if(id){
          this.clienteService.getCliente(id).subscribe((cliente) => this.cliente= cliente)
        }
      }
    )
  }

    update(): void{
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito!`, 'success')
      }
    )
  }

}
