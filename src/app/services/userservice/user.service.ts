import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from "rxjs";
import { UserModel } from "src/app/models/UserModel";
import { IUserLogin } from "src/app/models/IUserLogin";



@Injectable({ providedIn: 'root' })
export class UserService {

    URL_SUPABASE = 'https://jsfyvyyqipltixxcddms.supabase.co/rest/v1/'


    constructor(private _httpclient: HttpClient) {

    }

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzZnl2eXlxaXBsdGl4eGNkZG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NTQyODEsImV4cCI6MjAxMTIzMDI4MX0.1QMVxxEjKiZvKfsxkyhyi4dsYp-oOgsdShkAaBb3qPk')

    getUserListSupaBase(): Observable<UserModel[]> {
        return this._httpclient.get<UserModel[]>(this.URL_SUPABASE+'usuarios', { headers: this.supabaseheaders, responseType: 'json' });
    }
    getUser(usuario: string): Observable<UserModel> {
        return this._httpclient.get<UserModel[]>(this.URL_SUPABASE + 'users?user_id=eq.' + usuario, { headers: this.supabaseheaders, responseType: 'json' }).pipe(
            map( (userInfo) => {
                return userInfo[0];
            })
        );
    }
    getLoginUser(iUserLogin: IUserLogin): Observable<string | any> {
      return this._httpclient.get<any>(this.URL_SUPABASE + "usuarios?usuario=eq." + iUserLogin.usuario + "&contrasenna=eq." + iUserLogin.contrasenna, { headers: this.supabaseheaders }).pipe(
          map((usuario) => {
              console.log(usuario[0]);
              return usuario[0];
          }), catchError((err) => {
              console.log(err)
              return err;
          })
      );
  }
  getUserType(usuario: string){
    return this._httpclient.get<any>(this.URL_SUPABASE+"users_type?user=eq."+usuario+"&select=id,created_at,user(*),type(*)", { headers: this.supabaseheaders}).pipe(
        map((userInfo) => {
            console.log(userInfo);
            return userInfo;
        })
    )
}
  }