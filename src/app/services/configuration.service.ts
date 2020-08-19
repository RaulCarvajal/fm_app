import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { res } from '../interfaces/response.interface';
import { link } from './app.settings';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http:HttpClient) { }

  //Fecha configurations
  getFec(){
    return this.http.get<res>(`http://${link}/config/getfech`);
  }
  setFec(){
    return this.http.post<res>(`http://${link}/config/setfech`,{});
  }
  changeFec(data){
    return this.http.put<res>(`http://${link}/config/changefech`,data);
  }

  //Tipos de mantenimiento configurations
  getTipos(){
    return this.http.get<res>(`http://${link}/config/getst`);
  }
  saveTipo(data){
    return this.http.post<res>(`http://${link}/config/savest`,data);
  }
  deleteTipo(id){
    return this.http.delete<res>(`http://${link}/config/delst/${id}`);
  }
  actualizarTipo(id){
    return this.http.put<res>(`http://${link}/config/actst/${id}`,{});
  }
  existeTipo(name){
    return this.http.get<res>(`http://${link}/config/extst/${name}`);
  }

}
