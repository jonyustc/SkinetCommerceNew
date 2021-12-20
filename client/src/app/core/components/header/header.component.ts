import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  breadcrumb$:Observable<any>;
  constructor(private breadcrumbService: BreadcrumbService) { 
    this.breadcrumbService.set('@productDetails','');
  }

  ngOnInit(): void {
    this.breadcrumb$ = this.breadcrumbService.breadcrumbs$.pipe(
      //tap(x=>console.log(x))
    );
  }


}
