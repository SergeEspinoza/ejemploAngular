import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[]=[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
  this.clienteService.getClientes().subscribe(
    clientes => this.clientes= clientes
  );
  }

  delete(cliente:Cliente): void{
    Swal.fire({
  title: 'Are you sure?',
  text: `Are you sure to delete ${cliente.nombre} ${cliente.apellido}`,
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.value) {
    this.clienteService.delete(cliente.id).subscribe(
      response => {
        this.clientes = this.clientes.filter(cli => cli !== cliente)
        Swal.fire(
          'Deleted!',
          `${cliente.nombre} has been Deleted successfully`,
          'success'
        )
      }
    )

  }
})
  }

}
