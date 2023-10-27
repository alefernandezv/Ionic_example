import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkWithHref ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/userservice/user.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLinkWithHref]
})
export class UsuarioPage {
  public alertButtons = ['Recuperar'] ;
  
  userTypeList$!: Observable<any>;
  usuario: string = "";
  userList: any;

  constructor(private router: Router,private _userService: UserService) { 
    this.usuario = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
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



