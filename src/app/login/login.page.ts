import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule,HttpClientModule],
  providers: [UserService]})
export class LoginPage implements OnInit, OnDestroy {

  userLoginModal: IUserLogin = {
    username: "",
    password: ""
  };
  public userExiste?: UserModel;
  public userList:UserModel[]=[];

  constructor(private route: Router,private _usuarioService: UserService) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  
  ngOnInit(): void {
    this.userLoginModalRestart();
  }
  async setObject(user:UserModel){
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  async userLogin(userLoginInfo: IUserLogin) {
    const user_id = await lastValueFrom(this._usuarioService.getLoginUser(userLoginInfo));
    console.log(user_id);
    if (user_id) {
      console.log("Usuario existe...");
      this.route.navigate(['usuario.page'], { state: { userInfo: user_id}})
    } else {
      //NO EXISTE
      console.log("Usuario no existe...");
    }
  }
  userLoginModalRestart(): void{
    this.userLoginModal.username = '';
    this.userLoginModal.password = '';
}
}