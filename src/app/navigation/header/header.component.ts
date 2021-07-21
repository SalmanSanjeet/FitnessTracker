import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  authSuscription: Subscription = new Subscription();
  isAuth = false;
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   this.authSuscription =  this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy(): void{
    this.authSuscription.unsubscribe();
  }
  // tslint:disable-next-line: typedef
  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
  onLogout(): void{
    this.authService.logout();
  }
}
