import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize, map } from 'rxjs/operators';
import { BusyService } from '../Services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService,private busyService: BusyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.busyService.busy();
    return next.handle(request).pipe(
      delay(1000),
      finalize(()=>{
        this.busyService.idle();
      })
    );
  }
}
