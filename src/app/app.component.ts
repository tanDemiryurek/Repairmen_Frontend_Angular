import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'repairmenFrontend-app';

  isClientLoggedIn: boolean = false;
  isCompanyLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  userId: string;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
        this.isCompanyLoggedIn = UserStorageService.isCompanyLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
  
        if (this.isClientLoggedIn) {
          this.userId = UserStorageService.getUserId();
          this.cdr.detectChanges();
        }
      }
    });
  
    if (this.isClientLoggedIn) {
      this.userId = UserStorageService.getUserId();

    }
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
