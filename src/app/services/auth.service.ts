import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  ret:boolean[];
  isLoged():boolean{
    if(!sessionStorage.length){
      return false;
    }else{
      return true;
    }
  }
  getId():string{
    return JSON.parse(sessionStorage.getItem('detalle'))._id;
  }
  getName():string{
    return JSON.parse(sessionStorage.getItem('detalle')).info.name;
  }
  getUsername():string{
    return JSON.parse(sessionStorage.getItem('detalle')).username;
  }
  getPassword():string{
    return JSON.parse(sessionStorage.getItem('detalle')).password;
  }
  getEmail():string{
    return JSON.parse(sessionStorage.getItem('detalle')).info.email;
  }
  getPermissions():any{
    return JSON.parse(sessionStorage.getItem('detalle')).permissions;
  }
  getRole():number{
    return JSON.parse(sessionStorage.getItem('detalle')).role;
  }
  getUser():number{
    return JSON.parse(sessionStorage.getItem('detalle'));
  }
  getEmpresaId():any{
    return JSON.parse(sessionStorage.getItem('detalle')).cliente;
  }

  closeSession(){
    sessionStorage.clear();
  }

}
