import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { servicios } from 'src/app/interfaces/service.interface';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/interfaces/user.interface';
import { EmgsService } from 'src/app/services/emgs.service';
import { emgs } from 'src/app/interfaces/emg.interface';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
  private auth: AuthService,
  private serv:ServiciosService,
  private userServices:UsuariosService, 
  private emgServices:EmgsService
  ) 
    { 
        this.loadTecnicos();
        this.loadEmgs()
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }
  admin: boolean = false;
  tecni: boolean = false;
  clien: boolean = false;

  ngOnInit() {
    switch (this.auth.getRole()) {
      case 0:
        this.admin = true;
        break;
      case 1:
        this.tecni = true;
        break;
      case 2:
        this.clien = true;
        break;
    }
    this.getHour();
    this.loadServices();
  }
  
  /*_________________________________*/
  hora:string = "";
  servicios:servicios[];
  SR:number = 0;
  ST:number = 0;
  SP:number = 0;
  m:number = 0;
  b:number = 0;
  e:number = 0;
  TServ:servicios[];
  ldtable:boolean = false;
  tecnicos:User[];
  emgs:emgs[];


  
  getHour(){
    let d = new Date();
    this.hora = d.getHours()+":"+(d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes());
  }
  
  loadServices(){
    this.serv.getAll().subscribe(
      res=>{
        this.servicios=res.detail;
        this.setFilters();
        setTimeout(()=>{this.getTodayServices();},500)
      },err=>{
        console.error(err);
      }
    );
  }
  
  setFilters(){
    this.SR = this.servicios.length;
    let st:servicios[] = this.servicios.filter( s => s.status == 4);
    this.ST = st.length;
    this.SP = this.SR - this.ST;
    this.getPieData(st);
  }

  getTodayServices(){
      this.TServ = this.servicios.filter( s => s.date.slice(0,10) == (new Date().toISOString().slice(0,10)));

      setTimeout(()=>{
        if(this.TServ.length == 0){
          this.ldtable = false;
        }else{
          this.ldtable= true;
        }
      },1000)
  }

  loadTecnicos(){
    this.userServices.gettec().subscribe(
      res=>{
        this.tecnicos=res.detail;
      },err=>{
        console.error(err);
      }
    );
  } 
  loadEmgs(){
    this.emgServices.getAll().subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.error(err);
      } 
    );
  }
  getTecnico(id:string):string{
    if(id==null){
      return "Por asignar"
    }else{
      let n:User = this.tecnicos.find((tec)=>{
        return tec._id == id;
      });
      return n.info.name;
    }
  }
  getEmg(id:string):string{
    let n:emgs = this.emgs.find((tec)=>{
                    return tec._id == id;
                 });
    return n.info.name;
  }

  /*   GRAFICA   */

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Mala','Buena' , 'Excelente'];
  public pieChartData: SingleDataSet = [0, 0, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chartColors: any[] = [{ backgroundColor:["#DC4141", "#418EDC", "#8EDC41"] }];

  ldchart:boolean = false;
  getPieData(st:servicios[]){
      st.length==0?this.ldchart = false:this.ldchart = true;
      let m = st.filter(s => s.score == 0).length     
      let b = st.filter(s => s.score == 1).length
      let e = st.filter(s => s.score == 2).length
      let t = m+b+e;
      this.pieChartData = [this.dosDecimales((m/t)*100),this.dosDecimales((b/t)*100),this.dosDecimales((e/t)*100)]
  }

  dosDecimales(n):number {
    let t=n.toString();
    let regex=/(\d*.\d{0,2})/;
    return t.match(regex)[0];
  }
}
