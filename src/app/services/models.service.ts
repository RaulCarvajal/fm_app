import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { res, resArray } from "../interfaces/response.interface";
import { link } from './app.settings';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private http:HttpClient) { }

  save(data:any){
    return this.http.post<res>(`http://${link}/models/save`, data);
  }

  getbyid(id:string){
    return this.http.get<res>(`http://${link}/models/get/${id}`);
  }

  get(){
    return this.http.get<resArray>(`http://${link}/models/get`);
  }

}