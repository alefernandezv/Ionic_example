import { Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate:[IngresadoGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    canActivate:[NoIngresadoGuard]

  },
  {
    path: 'profesor',
    loadComponent: () => import('./profesor/profesor.page').then( m => m.ProfesorPage)
  },
  {
    path: 'usuario',
    loadComponent: () => import('./usuario/usuario.page').then( m => m.UsuarioPage)
  },
  {
    path: 'user-type-menu',
    loadComponent: () => import('./user-type-menu/user-type-menu.page').then( m => m.UserTypeMenuPage)
  },
  {
    path: 'scan-qr',
    loadComponent: () => import('./scan-qr/scan-qr.page').then( m => m.ScanQrPage),
    canActivate:[IngresadoGuard]
  },
  {
    path: 'edit-asistencia',
    loadComponent: () => import('./edit-asistencia/edit-asistencia.page').then( m => m.EditAsistenciaPage),
    canActivate:[IngresadoGuard]
  },  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },





];
