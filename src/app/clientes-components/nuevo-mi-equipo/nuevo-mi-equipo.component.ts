import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { EmgsService } from 'src/app/services/emgs.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-nuevo-mi-equipo',
  templateUrl: './nuevo-mi-equipo.component.html',
  styleUrls: ['./nuevo-mi-equipo.component.css']
})
export class NuevoMiEquipoComponent implements OnInit {

  constructor(private userService:UsuariosService, private plantsService:PlantasService, 
              private emgServices:EmgsService, private router:Router, 
              private authService:AuthService, private fb:FormBuilder) 
    {
      this.emgForm = this.fb.group({
        planta : ['',[Validators.required]],
        linea : ['',[Validators.required]],
        nombre : ['',[]],
        modelo : ['',[Validators.required]],
        tipo : ['',[Validators.required]],
        desc : ['',[Validators.required]],
        serie : ['',[Validators.required]],
        cod_pro : ['',[Validators.required]]
      });
    }

  ngOnInit() {
    this.loadPlants();
  }

  emgForm:FormGroup;

  plants:Plant[];
  lines:Lines[];
  shortname_line:string;
  nombre:string;

  msg:boolean=false;
  msgErr:boolean=false;

  loadPlants(){
    let temp:any = this.emgForm.value;
    this.plantsService.getAllPlantas(this.authService.getEmpresaId()).subscribe(res=>{
      this.plants=res.detail;
    },err=>{
      console.log(err);
    });
  }
  loadLines(){
    let temp:any = this.emgForm.value;
    this.plants.forEach(el=>{
      if(el._id==temp.planta){
        this.lines=el.lines;
      }
    });
  }
  saveLine(){
    let temp:any=this.emgForm.value;
    this.plants.forEach(plant=>{
      if(plant._id==temp.planta){
        this.lines.forEach(line=>{
          if(line._id==temp.linea){
            this.shortname_line=line.shortname;
          }
        })
      }
    });
  }

  genName(){
    let temp:any=this.emgForm.value;
    this.emgServices.getByLine(temp.linea).subscribe(
      res=>{
        console.log(res);
        this.nombre=this.shortname_line+'_emg'+(res.detail.length+1);
      },err=>{

      }
    )
  }

  save(){
    let temp=this.emgForm.value;
    let nemg:any={
        'info': {
          'name':this.nombre,
          'type':temp.tipo,
          'model':temp.modelo,
          'description':temp.desc,
          'serial':temp.serie
        },
        'client':this.authService.getEmpresaId(),
        'plant':temp.planta,
        'line':temp.linea,
        'cod_pro':temp.cod_pro,
        'status':0,
        'active':true,
        'meta':{
          'registred_by' : this.authService.getEmpresaId()
        }
      };
    this.emgServices.create(nemg).subscribe(
      res=>{
        this.emgServices.genEmg(res.detail._id).subscribe(
        res=>{
          this.msg=true;
          setTimeout(()=>{
            this.regresar();
          },1500);
        },err=>{
          this.msgErr=true;
          setTimeout(()=>{
            this.regresar();
          },1500);
        })
      },err=>{
        console.log(err);
        this.msgErr=true;
        setTimeout(()=>{
          this.regresar();
        },1500);
    });
  }
  regresar(){
  this.router.navigateByUrl('misequipos');
  }
}