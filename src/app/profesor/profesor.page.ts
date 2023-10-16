import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfesorPage {
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
  ]
  constructor() { }

  ngOnInit() {
  }

}
