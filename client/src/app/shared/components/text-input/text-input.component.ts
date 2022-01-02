import { Component, ElementRef, forwardRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidator, ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit,ControlValueAccessor {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;

  constructor(public controlDir: NgControl) {
    console.log(this);
    // console.dir(this);
    this.controlDir.valueAccessor = this;
  }

  


  ngOnInit() {
    // const control = this.controlDir.control;
    // const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];
    // control?.setAsyncValidators(asyncValidators);
    // control?.updateValueAndValidity();
  }

  target(event:KeyboardEvent){
    return event.target as HTMLInputElement;
  }

  onChange(event:any){
    //return event.target.value;
  }

  onTouched(){}

  writeValue(obj: any): void {
    //this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    //console.log(this.onChange);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

 

}
