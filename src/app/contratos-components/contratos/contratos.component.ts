import { Component, OnInit } from '@angular/core';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Contrato } from 'src/app/interfaces/agreement.interface';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { User } from 'src/app/interfaces/user.interface';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  constructor(
    private contratosService:AgreementsService, 
    private router:Router,
    private empresaService:EmpresasService
    ) {
      this.loadEmpresas();
    }

  contratos: Contrato[];
  empresas:empresa[];

  busq:string;

  ngOnInit() {
    this.getContratos();
  }

  busqueda(){
    this.contratos = this.contratos.filter( e => e.description == this.busq);
  }
  getContratos(){
    this.contratosService.getContratos().subscribe(
      res => { 
        this.contratos = res.detail;
      },err => {
        console.log(err);
      }
    )
  }
  contratoDet(id){
    this.router.navigateByUrl(`contratos/${id}`);
  }
  goNewContrato(){
    this.router.navigateByUrl(`contratos/nuevo`)
  }
  loadEmpresas(){
    this.empresaService.get().subscribe(
      res => {
        this.empresas = res.detail;
      },
      err => {
        console.error(err)
      }
    );
  }
  getTipo(data : boolean):string{
    if(data){
      return "Puntual"
    }else{
      return "Normal"
    }
  }
  getEmpresa(id):string{
    return this.empresas.find( e => e._id == id).name;
  }
}
