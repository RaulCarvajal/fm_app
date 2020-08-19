import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { link } from './app.settings';
import { res } from '../interfaces/response.interface';
import { namespace } from '../interfaces/namespaces.interface';

@Injectable({
  providedIn: 'root'
})
export class NamespacesService {

  constructor(private http:HttpClient) {
    this.itsSaved();
  }

  get(){
    return this.http.get<res>(`http://${link}/namespaces/get`);
  }

  add(data:any){
    return this.http.post<res>(`http://${link}/namespaces/add`,data);
  }

  upd(data:any){
    return this.http.put<res>(`http://${link}/namespaces/update`,data);
  }

  saveToLocalStorage(data:any){
    localStorage.setItem("namespaces",JSON.stringify(data));
  }
  
  getLSPlantas():string{
    return this.pluralizar(JSON.parse(localStorage.getItem('namespaces')).planta);
  }

  getLSLineas():string{
    return this.pluralizar(JSON.parse(localStorage.getItem('namespaces')).linea);
  }

  getLSEquipos():string{
    return this.pluralizar(JSON.parse(localStorage.getItem('namespaces')).equipo);
  }

  getLSid():string{
    return JSON.parse(localStorage.getItem('namespaces'))._id;
  }

  getLSns():namespace{
    return JSON.parse(localStorage.getItem('namespaces'))
  }

  getLSPlantasSing():string{
    return JSON.parse(localStorage.getItem('namespaces')).planta;
  }

  getLSLineasSing():string{
    return JSON.parse(localStorage.getItem('namespaces')).linea;
  }

  getLSEquiposSing():string{
    return JSON.parse(localStorage.getItem('namespaces')).equipo;
  }

  itsSaved(){
    if(localStorage.getItem('namespaces') == null){
      this.get().subscribe(
        res => {
          if(res.detail == null){
            this.add({ planta : "Plantas", linea : "Lineas", equipo : "Equipos" }).subscribe(res =>{})
            this.itsSaved()
          }else{
            this.saveToLocalStorage(res.detail);
          }
        },
      );
    }
  }

  private pluralizar(sustantivo:string):string{
    sustantivo = sustantivo.toLowerCase();
    let t1 = sustantivo.slice(sustantivo.length-1,sustantivo.length)
    let t2 = sustantivo.slice(sustantivo.length-2,sustantivo.length)
    if( t1 == "a" || t1 == "e" || t1 == "o"){
      return sustantivo[0].toUpperCase()+sustantivo.slice(1)+"s";
    }else if(t1 == "l" || t1 == "y" || t1 == "d" || t1 == "r" || t2 == "ón"){
      return sustantivo[0].toUpperCase()+sustantivo.slice(1)+"es";
    }else if(t1 == "z"){
      return sustantivo[0].toUpperCase()+sustantivo.slice(1,sustantivo.length-1)+"ces";
    }else{
      return sustantivo[0].toUpperCase()+sustantivo.slice(1)+"s";
    }
  }

}
