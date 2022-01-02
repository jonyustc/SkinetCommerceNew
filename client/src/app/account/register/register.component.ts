import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  errors:any;

  constructor(private fb:FormBuilder,private accountService:AccountService,private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      displayName:[null,Validators.required],
      email:[null,
        [Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.checkEmailAlreadyTaken()]
      ],
      password:[null,Validators.required]
    });
  }

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(()=>{
      console.log('Register Successfully');
      this.router.navigateByUrl('/');
    },error=>{
      console.log(error);
      this.errors = error.error.errors;
    });
  }

  checkEmailAlreadyTaken():AsyncValidatorFn{
    return control => {
     return this.accountService.checkEmailExists(control.value).pipe(
        map(res => {
          return (res ? { emailExists : true } : null)
        })
      )
    }
  }

}
