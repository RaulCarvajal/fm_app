import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { EmgsService } from 'src/app/services/emgs.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from '@angular/common';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Contrato } from 'src/app/interfaces/agreement.interface';
import { ModelsService } from 'src/app/services/models.service';
import { models } from 'src/app/interfaces/models.interface';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-addemg',
  templateUrl: './addemg.component.html',
  styleUrls: ['./addemg.component.css']
})
export class AddemgComponent implements OnInit{

  constructor(private empresaService:EmpresasService, private plantsService:PlantasService, 
              private emgServices:EmgsService, private router:Router, 
              private authService:AuthService, private fb:FormBuilder,
              private alert:AlertService, private location: Location,
              private modelsService:ModelsService,
              private nss:NamespacesService
              ) { 
                this.nslinea = this.nss.getLSLineas();
                this.nsplanta = this.nss.getLSPlantas();
                this.nsequipo = this.nss.getLSEquipos();
                this.nslineaS = this.nss.getLSLineasSing(); 
                this.nsplantaS = this.nss.getLSPlantasSing();
                this.nsequipoS = this.nss.getLSEquiposSing();

                this.emgForm = this.fb.group({
                  cliente : ['',[Validators.required]],
                  planta : ['',[Validators.required]],
                  linea : ['',[Validators.required]],
                  nombre : ['',[]],
                  modelo : ['',[Validators.required]],
                  tipo : ['',[Validators.required]],
                  desc : ['',[Validators.required]],
                  serie : ['',[Validators.required]],
                  cod_pro : ['',[]],
                  agreement : ['',[]],
                  enlaces : ['',[]],
                  extras : ['', []],
                  img : ['', []],
                });

              }

  ngOnInit() {
    this.loadUsers();
    this.getModelos();
  }

  nslinea:string = "";
  nsplanta:string = "";
  nsequipo:string = "";
  nslineaS:string = "";
  nsplantaS:string = "";
  nsequipoS:string = "";

  emgForm:FormGroup;

  users:User[];
  plants:Plant[];
  lines:Lines[];
  shortname_line:string;
  nombre:string;

  load: boolean = true;
  guardando: boolean = false;

  modelos:models[];


  loadUsers(){
    this.empresaService.get().subscribe(res=>{
      this.users=res.detail;
      this.load = false;
      console.log(this.users);
    },err=>{
      console.log(err);
    })
  }
  loadPlants(){
    let temp:any = this.emgForm.value;
    this.plantsService.getAllPlantas(temp.cliente).subscribe(res=>{
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
        this.nombre=this.shortname_line+'_obj'+(res.detail.length+1);
      },err=>{

      }
    )
  }

  save(){
    this.guardando = true;
    let temp=this.emgForm.value;
    let nemg:any={
      'info': {
        'name':this.nombre,
        'type':temp.tipo,
        'model':temp.modelo,
        'description':temp.desc,
        'serial':temp.serie
      },
      'client':temp.cliente,
      'plant':temp.planta,
      'line':temp.linea,
      'cod_pro':temp.cod_pro,
      'agreement':temp.agreement,
      'status':0,
      'active':true,
      'meta':{
        'registred_by' : this.authService.getId()
      },
      'enlaces': temp.enlaces,
      'extras' : temp.extras,
      'img' : 'data:image/png;base64,'+this.img //temp.img//
    };
    console.log(nemg)
    this.emgServices.create(nemg).subscribe(
    res=>{
      this.emgServices.genEmg(res.detail._id).subscribe(
        res=>{
          this.guardando = false
          this.alert.success("Registro creado con éxito, serás redigirido en unos segundos.");
          setTimeout(()=>{
            this.regresar();
          },1500);
        },err=>{
          this.alert.error("Ocurrio un error durante el registro");
        });
    },err=>{
      console.log(err);
      this.alert.error("Ocurrio un error durante el registro");
    });
  }

  regresar(){
    this.location.back();
  } 

  getModelos(){
    this.modelsService.get().subscribe(
      res => {
        this.modelos = res.detail
        if(this.modelos.length == 0){
          this.alert.alert("No se encuentran modelos registrados, por favor regresa a la pantalla anterior y da click en la penstaña correspondiente para registrar modelos nuevos.");
        }
      },
      err => console.error(err)
    );
  }

  getModelo(){
    let modelo:models = this.modelos.find( e => e.modelo == this.emgForm.value.modelo);

    this.emgForm.patchValue({ tipo : modelo.tipo , desc : modelo.descripcion, enlaces : modelo.enlaces});
  }

  private img:String="";

  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
        var reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.img= btoa(binaryString);
    //console.log(btoa(binaryString));
  }

}
