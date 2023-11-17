import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/userservice/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref,],
})

export class HomePage {
  
  public alertButtons = ['Recuperar'] ;
  
  public alertInputs = [
    {
      placeholder: 'Nombre',
    },
    {
      placeholder: 'Contraseña (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
    },
    {
      placeholder: 'Repetir Contraseña (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
      
      
    },
    

  ];
  cerrarSesion(){
    localStorage.removeItem('ingresado');
    this.router.navigate(["/login"]);
  }
  type_user:string="";
  data:any;
  clase:any;
  asistencia:string="";
  constructor(private activateRouter:ActivatedRoute,private router:Router,private service:UserService) {
    this.activateRouter.queryParams.subscribe(parent => {
      if (this.router.getCurrentNavigation()?.extras.state){
        this.data = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
        console.log(this.data)
        this.type_user=this.data.superuser?"Profesor":"Alumno";
      }else{
        this.router.navigate(['/login'])
      }
    });
  }
  getDuocList(){
    this.service.getDuocList().subscribe((data)=>{
      console.log(data);
      this.clase=data;
      for(let i =0;i<=this.clase.length;i++){
      
      }
    })
  }

  ionViewWillEnter(){
    this.getDuocList();
  }
}