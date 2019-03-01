import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'info-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    year: number = Date.now();

    constructor(private router: Router,
                private authService: AuthService,
                public localStorageService: LocalStorageService) { }

    ngOnInit() { }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/home');
    }

}
