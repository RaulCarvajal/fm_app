import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { res, resArray } from '../interfaces/response.interface';
import { link } from './app.settings';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http:HttpClient) { }


  //Get all
  get(){
    return this.http.get<resArray>(`http://${link}/client/get`);
  }
  //save
  save(data:any){
    return this.http.post<res>(`http://${link}/client/save`,data);
  }
  //enable
  enable(id:Number){
    return this.http.put<res>(`http://${link}/client/enable/${id}`,{});
  }
  //disable
  disable(id:Number){
    return this.http.put<res>(`http://${link}/client/disable/${id}`,{});
  }
  //getClient
  getid(id: String){
    return this.http.get<res>(`http://${link}/client/get/${id}`);
  }

}
