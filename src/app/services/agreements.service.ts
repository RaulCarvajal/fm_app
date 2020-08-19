import { Injectable } from '@angular/core';
import { link } from './app.settings';
import { HttpClient } from '@angular/common/http';
import { res, resArray } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AgreementsService {

  constructor(private http: HttpClient) { }

  saveContrato(data: any){
    return this.http.post<res>(`http://${link}/agreements/savecontrato`,data);
  }

  getContratoById(id:string){
    return this.http.get<res>(`http://${link}/agreements/getcontratobyid/${id}`);
  }

  getContratosByClient(id:string){
    return this.http.get<resArray>(`http://${link}/agreements/getcontratobyclient/${id}`);
  }
  getContratosActivosByClient(id:string){
    return this.http.get<resArray>(`http://${link}/agreements/getcontratosactivosbyclient/${id}`);
  }
  getContratos(){
    return this.http.get<resArray>(`http://${link}/agreements/getcontratos`);
  }
  getContratosActivos(){
    return this.http.get<resArray>(`http://${link}/agreements/getcontratosactivos`);
  }
  addEmg(id:string, data: any){
    return this.http.put<res>(`http://${link}/agreements/addemg/${id}`,data);
  }

  vencer(id:String){
    return this.http.put<res>(`http://${link}/agreements/vencer/${id}`,{});
  }
  restar(id:String, total:number){
    return this.http.put<res>(`http://${link}/agreements/restar/${id}`,{ total : total });
  }
  actualizar(data:any){
    return this.http.put<res>(`http://${link}/agreements/actualizar`,data);
  }
}
