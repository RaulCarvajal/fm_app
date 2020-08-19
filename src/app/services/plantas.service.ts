import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { res, resArray } from "../interfaces/response.interface";
import { link } from './app.settings';


@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  constructor(private http:HttpClient) { }

  getAllPlantas(id:string){
    return this.http.get<resArray>(`http://${link}/plant/getplants/${id}`);
  }

  getAll(){
    return this.http.get<resArray>(`http://${link}/plant/getall`);
  }

  getPlanta(id:string){
    return this.http.get<res>(`http://${link}/plant/getplant/${id}`)
  }

  updatePlanta(plant:JSON){
    return this.http.put<res>(`http://${link}/plant/update`,
      plant
    );
  }

  crear(plant:JSON){
    return this.http.post<res>(`http://${link}/plant/create`,
      plant
    );
  }

  addLinea(line:JSON, id_p:string){
    return this.http.put<res>(`http://${link}/plant/addline/`+id_p,
      line
    );
  }
}