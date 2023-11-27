import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/userservice/user.service';
import { Observable } from 'rxjs';
import { ToastController, ToastOptions } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistroPage implements OnInit {

  constructor(private activateRouter:ActivatedRoute,private router:Router,private service:UserService,private toastController:ToastController) { }

  ngOnInit() {
  }
  data:any;
  clase:any;
  claSe:any={
    rut:"",
    nombre: "",
    apellido:"",
    edad:"",
    correo:"",
    usuario:"",
    password:"",
    superuser:false
  }
  addUsuario(){
    if (this.claSe.rut == "" ||this.claSe.nombre == "" ||this.claSe.apellido == "" ||this.claSe.edad == "" ||this.claSe.correo == "" || this.claSe.usuario == "" || this.claSe.password == ""||this.claSe.superuser == "" ) {
      this.presentToast({
        message: ' Error al registrar clase, debe llenar los campos ',
        duration: 3000,
        position: 'middle',
        icon: 'alert-circle-outline'
      });
      return;
    }else{
      this.service.addUsuario(this.claSe).subscribe({
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
  limpiar(){
    this.claSe.rut=""
    this.claSe.nombre=""
    this.claSe.apellido=""
    this.claSe.edad=""
    this.claSe.correo=""
    this.claSe.usuario=""
    this.claSe.password=""
    this.claSe.superuser=""
  }
  nextpage() {
    this.router.navigate(['/login']);
  }
}
