import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserService } from '../services/userservice/user.service';

@Component({
  selector: 'app-edit-asistencia',
  templateUrl: './edit-asistencia.page.html',
  styleUrls: ['./edit-asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditAsistenciaPage implements OnInit {

  constructor( private activateRoute: ActivatedRoute,private router: Router,private toastController: ToastController, private services:UserService) { }

  ngOnInit() {
    this.getDuocId(this.getIdFromUrl());
  }
  data: any;
  claSe: any={
    correo:"",
    rut:"",
    asistencia: false
  }
  getIdFromUrl(){
    let url = this.router.url;
    let arr = url.split('/',3);
    let id_clase = parseInt(arr[2])
    return id_clase;
  }
  
  updateClase(){
    this.services.updateClase(this.claSe.id_clase, this.claSe).subscribe({
      next: (() =>{
        console.log("Actualizado correctamente: "+this.claSe);
        this.getDuoclist();
        this.presentToast({
          message: 'Datos del zoologico actualizados, redirigiendo al Home',
          duration: 3500,
          position: 'middle',
          icon: 'alert-circle-outline'
        });
        this.router.navigateByUrl('home');
      }),
      error: (error => {
        console.log("Error "+ error)
      })
    })
  }
  getDuoclist() {
    this.services.getDuocList().subscribe((data) => {
      console.log(data);
      this.claSe = data;
    });  
  }
  getDuocId(id_clase: any) {
    this.services.getDuocId(id_clase).subscribe((data) => {
      console.log(data);
      this.claSe = data;
    });
  }
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }
}

