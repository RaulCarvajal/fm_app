import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { link } from './app.settings';
import { res } from '../interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  login(user: string,pass: string, url: string){
    return this.http.post<res>(`http://${url}/user/login`, 
    {
      username: user,
      password: pass
    }, 
    this.httpOptions);
  }

}

