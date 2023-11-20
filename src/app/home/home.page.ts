import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/userservice/user.service';
import { Observable } from 'rxjs';
import { ToastController, ToastOptions } from '@ionic/angular';

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
  claSe:any={
    correo:"",
    rut:"",
    asistencia: false
  }
  constructor(private activateRouter:ActivatedRoute,private router:Router,private service:UserService,private toastController:ToastController) {
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
      for(let i =0;i<this.clase.length;i++){
        console.log(this.clase)
        this.clase[i].asistencia=this.clase[i].asistencia?"Presente":"Ausente"
      }
    })
  }

  ionViewWillEnter(){
    this.getDuocList();
  }
  addDuoc(){
    if (this.claSe.correo == "" || this.claSe.rut == "" || this.claSe.asistencia == false) {
      this.presentToast({
        message: ' Error al registrar clase, debe llenar los campos ',
        duration: 3000,
        position: 'middle',
        icon: 'alert-circle-outline'
      });
      return;
    }else{
      this.service.adduoc(this.claSe).subscribe({
        next: (() => {
          console.log("Clase creado: "+ this.claSe)
          this.presentToast({
            message: ' Clase creado ',
            duration: 3000,
            position: 'middle',
            icon: 'alert-circle-outline'
          });
          this.getDuocList();
          this.limpiar();
        })
      })
    }
  }
  async presentToast(opts?:ToastOptions){
    const toast= await this.toastController.create(opts);
    toast.present();
  }
  getDuocId(id: any){
    this.service.getDuocId(id).subscribe((data) => {
      console.log(data);
      this.claSe = data
    })
  }
  limpiar(){
    this.claSe.correo=""
    this.claSe.rut=""
    this.claSe.asistencia=""
  }
  deleteDuoc(id_clase: any){
    this.service.deleteDuoc(id_clase).subscribe({
      next: (() => {
        this.presentToast({
          message: 'duoceliminado',
          duration: 3500,
          position: 'middle',
          icon: 'alert-circle-outline'
        });
        console.log("duoc eliminado");
        this.getDuocList();
      }),
      error: (error => {
        console.log("Error"+ error)
      })
    })
  }
}