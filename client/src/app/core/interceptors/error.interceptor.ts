import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error){
          if(error.status === 500){
            let navigationExtras:NavigationExtras = { state: error.error};

            this.router.navigateByUrl('server-error',navigationExtras);

          }

          if(error.status === 404){
            this.router.navigateByUrl('notfound');
          }

          if(error.status === 401){
            this.toastr.error(error.error.message,error.status);
          }
          
          if(error.status === 400){
            if(error.error.errors){
              //var errors = error.error.errors;

              //let navigationExtras:NavigationExtras = { state: errors};

              //this.router.navigateByUrl('error',navigationExtras);

              //this.toastr.error('Validation Error',error.status);
              return throwError(error);
            }
            else{
              this.toastr.error(error.error.message,error.status);
            }
            
          }
        }
        return throwError(error)
      })
    );
  }
}
