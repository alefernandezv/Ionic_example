import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { IUserLogin } from '../models/IUserLogin';
import { UserModel } from '../models/UserModel';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import {Preferences } from '@capacitor/preferences';
import { UserService } from '../services/userservice/user.service';






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule,HttpClientModule,NgFor,NgForOf],
  providers: [UserService]})
export class LoginPage implements OnInit, OnDestroy {

  userLoginModal: IUserLogin = {
    usuario: "",
    contrasenna: ""
  };
  public userExiste?: UserModel;
  public userList:UserModel[] = [];

  constructor(private route: Router,private _usuarioService: UserService) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  
  ngOnInit(): void {
    this.userLoginModalRestart();
  }
  async setObject(usuario: UserModel){
    await Preferences.set({
      key: 'usuario',
      value: JSON.stringify(usuario)
    });
  }

  async userLogin(userLoginInfo: IUserLogin) {
    const usuario = await lastValueFrom(this._usuarioService.getLoginUser(userLoginInfo));
    console.log(usuario);
    if (usuario) {
      console.log("Usuario existe...");
      //this.route.navigate(['/profesor'], { state: { userInfo: usuario}})
      this.route.navigate(['/home'],  { state: { userInfo: usuario}});
    } else {
      //NO EXISTE
      console.log("Usuario no existe...");
      
    }
  }
  userLoginModalRestart(): void{
    this.userLoginModal.usuario = '';
    this.userLoginModal.contrasenna = '';
}
}