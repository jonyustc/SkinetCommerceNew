import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  baseUrl = environment.apiUrl;
  errors: any=[];

  constructor(private http: HttpClient,private router:Router) { 
    
  }

  ngOnInit(): void {

  }

  get500ServerError(){
    return this.http.get(this.baseUrl + 'buggy/servererror').subscribe(res=>{
      console.log(res);
    },error =>{
      console.log(error);
    });
  }

  get404NotFoundError(){
    return this.http.get(this.baseUrl + 'buggy/notfound').subscribe(res=>{
      console.log(res);
    },error =>{
      console.log(error);
    });
  }

  get400BadRequestError(){
    return this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(res=>{
      console.log(res);
    },error =>{
      console.log(error);
    });
  }

  
  getValidationError(){
    return this.http.get(this.baseUrl + 'buggy/validationerror/fortyTwo').subscribe(res=>{
      console.log(res);
    },error =>{
      console.log(error);
      this.errors = error;
    });
  }

}
