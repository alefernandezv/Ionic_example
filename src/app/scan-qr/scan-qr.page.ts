import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/userservice/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class ScanQrPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
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
  
  nextpage() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.toastController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
