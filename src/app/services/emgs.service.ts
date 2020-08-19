import { Injectable } from '@angular/core';
import { res, resArray } from "./../interfaces/response.interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { link } from './app.settings';
import { consts } from './reports.settings';
import { toBase64String } from '@angular/compiler/src/output/source_map';


@Injectable({
  providedIn: 'root'
})
export class EmgsService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<resArray>(`http://${link}/emg/getall`);
  }
  getByClient(id:string){
    return this.http.get<resArray>(`http://${link}/emg/getbyclient/${id}`);
  }
  getByPlant(id:string){
    return this.http.get<resArray>(`http://${link}/emg/getbyplant/${id}`);
  }
  getByLine(id:string){
    return this.http.get<resArray>(`http://${link}/emg/getbyline/${id}`);
  }
  getByPlantAndLine(id_p:string, id_l:string){
    return this.http.get<resArray>(`http://${link}/emg/getbyplantandline/${id_p}/${id_l}`);
  }
  create(nuevo:JSON){
    return this.http.post<res>(`http://${link}/emg/create`,nuevo);
  }
  genEmg(id:string){
    return this.http.put<res>(`http://${link}/emg/genqr/${id}`,{});
  }
  update(data: any){
    return this.http.put<res>(`http://${link}/emg/edit`,data);
  }
  getById(id:string){
    return this.http.get<res>(`http://${link}/emg/getbyid/${id}`);
  }
  actDes(id:string,stat:boolean){
    if(stat){
      return this.http.patch<res>(`http://${link}/emg/disable/${id}`, {'Content-Type': 'application/json'});
    }else{
      return this.http.patch<res>(`http://${link}/emg/enable/${id}`, {'Content-Type': 'application/json'});
    }
  }

  getPdf(data:any){
    var mediaType = 'application/pdf';
    this.http.post(consts.link, data, {'responseType' : 'blob'}).subscribe(
        (response) => {
            var blob = new Blob( [ <any>response ], { type: mediaType });
            saveAs(blob, 'ficha_emg.pdf');
            console.log(response);
        },
        e => { console.error(e) }
    );
  }

}

