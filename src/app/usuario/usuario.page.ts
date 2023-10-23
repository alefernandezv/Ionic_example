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
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UsuarioPage {
  public alertButtons = ['Recuperar'] ;
  
  userTypeList$!: Observable<any>;
  user_id: string = "";

  constructor(private router: Router,private _userService: UserService) { 
    this.user_id = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
  }

  ngOnInit() {
    console.log(this.user_id);
    this.userTypeList$ = this._userService.getUserType(this.user_id);
  }

  sendPage(path: string){
    console.log(path);
    this.router.navigate([path], { state: { userInfo: this.user_id}});
  }
   
}



