import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mantenimiento-emg';
  
  constructor(private router: Router, private auth:AuthService) { }

  ngOnInit() {
    if(this.auth.isLoged()){
      this.router.navigate(["inicio"]);
    }else{
      this.router.navigate(["login"]);
    }
  }

}