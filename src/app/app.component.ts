import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'info-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(public localStorage: LocalStorageService, private authService: AuthService, private router: Router) { }

    ngOnInit() { }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/home');
    }

}
