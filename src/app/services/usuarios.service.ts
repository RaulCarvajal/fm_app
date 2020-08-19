import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { res, resArray } from "../interfaces/response.interface";
import { link } from './app.settings';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }
  getAllUsers(){
    return this.http.get<res>(`http://${link}/user/getall`);
  }
  getUser(id:string){
    return this.http.get<res>(`http://${link}/user/getbyid/${id}`);
  }
  updateUser(user:JSON){
    return this.http.put<res>(`http://${link}/user/update`,
      user
    );
  }
  actDes(id:string,stat:boolean){
    if(stat){
      return this.http.patch<res>(`http://${link}/user/disable/${id}`, {'Content-Type': 'application/json'});
    }else{
      return this.http.patch<res>(`http://${link}/user/enable/${id}`, {'Content-Type': 'application/json'});
    }
  }
  newUser(user){
    return this.http.post<res>(`http://${link}/user/create/`, user);
  }
  sendMailNewUser(data){
    return this.http.post<res>(`http://${link}/user/newUserEmail`,data);
  }
  userExists(u:string){
    return this.http.get<res>(`http://${link}/user/existe/${u}`);
  }
  getAllClients(){
    return this.http.get<resArray>(`http://${link}/user/getclients`);
  }
  gettec(){
    return this.http.get<resArray>(`http://${link}/user/gettec`);
  }
  getAdmin(){
    return this.http.get<res>(`http://${link}/user/getadmin`);
  }
  updatePass(user:JSON){
    return this.http.put<res>(`http://${link}/user/updatepass`,
      user
    );
  }
}
