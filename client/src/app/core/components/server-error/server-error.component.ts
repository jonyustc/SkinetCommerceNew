import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
  errors:any;
  constructor(private router:Router) {
    
    this.errors = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.errors);
   }

  ngOnInit(): void {
  }

}
