import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/userservice/user.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-user-type-menu',
  templateUrl: './user-type-menu.page.html',
  styleUrls: ['./user-type-menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserTypeMenuPage implements OnInit {

  userTypeList$!: Observable<any>;
  usuario: string = "";

  constructor(private router: Router ,private _userService: UserService) {
    this.usuario=this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
  }

  ngOnInit() {
    console.log(this.usuario);
    this.userTypeList$ = this._userService.getUserType(this.usuario); 
  }
  sendPage(path: string){
    console.log(path);
    this.router.navigate([path], { state: { userInfo: this.usuario}});
  }
}
