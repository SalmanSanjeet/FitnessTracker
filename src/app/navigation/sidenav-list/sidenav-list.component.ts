import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  authSuscription: Subscription = new Subscription();
  isAuth = false;
  @Output() closeSidenav = new EventEmitter<void>();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSuscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }
  ngOnDestroy(): void{
    this.authSuscription.unsubscribe();
  }
  // tslint:disable-next-line: typedef
  onClose() {
    this.authService.logout();
    this.closeSidenav.emit();
  }
  onLogout(): void{
    this.authService.logout();
  }
}
