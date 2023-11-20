import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError, tap } from "rxjs";
import { UserModel } from "src/app/models/UserModel";
import { IUserLogin } from "src/app/models/IUserLogin";
import { Clase } from "src/app/models/Clase";




@Injectable({ providedIn: 'root' })
export class UserService {

    URL_SUPABASE = 'https://jsfyvyyqipltixxcddms.supabase.co/rest/v1'


    constructor(private _httpclient: HttpClient) {

    }

    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzZnl2eXlxaXBsdGl4eGNkZG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NTQyODEsImV4cCI6MjAxMTIzMDI4MX0.1QMVxxEjKiZvKfsxkyhyi4dsYp-oOgsdShkAaBb3qPk')


    getUserListSupaBase(): Observable<UserModel[]> {
        return this._httpclient.get<UserModel[]>(this.URL_SUPABASE + 'usuarios', { headers: this.supabaseheaders, responseType: 'json' });
    }
    authUser(): Observable<UserModel> {
        return this._httpclient.get<UserModel>(this.URL_SUPABASE.concat('?usuario=eq.ctapia'), { headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' })
    }

    getUser(usuario: string): Observable<UserModel> {
        return this._httpclient.get<UserModel[]>(this.URL_SUPABASE + 'users?usuario=eq.' + usuario, { headers: this.supabaseheaders, responseType: 'json' }).pipe(
            map((userInfo) => {
                return userInfo[0];
            })
        );
    }
    getLoginUser(iUserLogin: IUserLogin): Observable<string | any> {
        return this._httpclient.get<any>(this.URL_SUPABASE + "usuarios?usuario=eq." + iUserLogin.usuario + "&password=eq." + iUserLogin.password, { headers: this.supabaseheaders }).pipe(
            map((usuario) => {
                console.log(usuario[0]);
                return usuario[0];
            }), catchError((err) => {
                console.log(err)
                return err;
            })
        );
    }
    getUserType(usuario: string) {
        return this._httpclient.get<any>(this.URL_SUPABASE + "users_type?user=eq." + usuario + "&select=id,created_at,user(*),type(*)", { headers: this.supabaseheaders }).pipe(
            map((userInfo) => {
                console.log(userInfo);
                return userInfo;
            })
        )
    }
    getDuocList(): Observable<Clase[]> {
        return this._httpclient.get<Clase[]>(`${this.URL_SUPABASE}/clase`,{headers:this.supabaseheaders}).pipe(
            tap((clase) => console.log('asistencias obtenidos')),
            catchError(this.handleError<Clase[]>('Get clase', []))
        );
    }
    adduoc(clase: Clase): Observable<any> {
        return this._httpclient.post<Clase>(`${this.URL_SUPABASE}/clase`, clase, {headers:this.supabaseheaders})
            .pipe(catchError(this.handleError<Clase>('Add clase')))
    }
    getDuocId(id: any):Observable<Clase[]>{
        return this._httpclient.get<Clase[]>(`${this.URL_SUPABASE}/clase` + id).pipe(
          tap((_) => console.log(`duoc fetched: ${id}`)),
          catchError(this.handleError<Clase[]>(`Get duoc id=${id}`))
        );
      }
      updateDuoc(id: any, cla: Clase):Observable<any>{
        return this._httpclient.put(`${this.URL_SUPABASE}/clase`+ id, cla,
          {headers:this.supabaseheaders}).pipe(
            tap((_) => console.log(`clase updated: ${id}`)),
            catchError(this.handleError<Clase[]>('Update Clase'))
          );
      }
      deleteDuoc(id: any): Observable<Clase[]>{
        return this._httpclient.delete<Clase[]>(`${this.URL_SUPABASE}/clase?id_clase=eq.` + id,{headers:this.supabaseheaders}).pipe(
          tap((_) => console.log(`duoc clase: ${id}`)),
          catchError(this.handleError<Clase[]>(`Delete clase`))
        )
      }
    private handleError<T>(operation='operation',result?:T){
        return (error:any):Observable <T> =>{
          console.log(error);
          console.log(`${operation}failded:${error.message}`);
          return of (result as T)
        };
      }
}