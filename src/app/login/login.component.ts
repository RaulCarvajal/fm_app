import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';
import { AuthService } from "./../services/auth.service";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { link } from './../services/app.settings';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router:Router,
              private auth:AuthService, public fb: FormBuilder,
              private alert:AlertService) {
    
    this.logForm = this.fb.group({
      usr: ['', [Validators.required]],
      pwd: ['', [Validators.required]]
    });
  }

  load: boolean = false;
  logForm: FormGroup;
  faillog:boolean=false;

  ngOnInit() {
    if(this.auth.isLoged()){
      this.router.navigate(["inicio"]);
    }
  }

  login(){
    this.load = true;
    this.loginService.login(this.logForm.value.usr,this.logForm.value.pwd,link).subscribe(
      (res)=>{
        if(res.detail == null){
          this.alert.error(`<p class="text-center">No existe el usuario <b>${this.logForm.value.usr}</b></p>`);
          this.load = false;
          this.faillog = true;
          setTimeout(() => {
            this.faillog = false;
            this.logForm.patchValue({ usr : "", pwd : ""});
          }, 3000);
        }else if(res.detail.active && res.detail.password == this.logForm.value.pwd){
          this.setSession(res);
        }else {
          this.alert.error(`<p class="text-center">Contraseña incorrecta ó tu usuario <b>"${this.logForm.value.usr}"</b> por el momento no se encuentra <b>activo</b></p>`);
          this.load = false;
          this.faillog = true;
          setTimeout(() => {
            this.faillog = false;
            this.logForm.patchValue({ usr : "", pwd : ""});
          }, 3000);
        }
      },
      (err)=>{
        console.log(err)
      })
    };

  setSession(res){
    sessionStorage.setItem("detalle",JSON.stringify(res.detail));
    this.faillog=false;
    this.router.navigate(['inicio']);
  }
}