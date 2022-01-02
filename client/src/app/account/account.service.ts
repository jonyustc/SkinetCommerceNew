import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSoucre = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSoucre.asObservable();

  constructor(private http: HttpClient,private router: Router) { }

  loadCurrentUser(token:any){
    if(token==null){
      this.currentUserSoucre.next(null as any);
      return of(null as any);
    }

    var headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);
    return this.http.get<IUser>(this.baseUrl + 'account',{headers}).pipe(
      map((user:IUser) => {
        localStorage.setItem('token',user.token);
          this.currentUserSoucre.next(user);
      })
    );
  }


  login(values:any){
    return this.http.post<IUser>(this.baseUrl + 'account/login',values).pipe(
      map((user:IUser) => {
        if(user){
          localStorage.setItem('token',user.token);
          this.currentUserSoucre.next(user);
        }
      })
    );
  }

  register(values:any){
    return this.http.post<IUser>(this.baseUrl + 'account/register',values).pipe(
      map((user:IUser) => {
        if(user){
          localStorage.setItem('token',user.token);
          this.currentUserSoucre.next(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSoucre.next(null as any);
    this.router.navigateByUrl('/account/login');
  }

  checkEmailExists(email:string){
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

}
