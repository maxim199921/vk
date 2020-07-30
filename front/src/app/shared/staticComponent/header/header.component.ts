import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
    }

    show(): boolean {
        return this.authService.isLoggedIn();
    }

    logout(): void {
        localStorage.clear();
        this.authService.checkLogin = false;
        this.router.navigate(['']);
    }

    searchBegin(value): void {
        this.router.navigate([`main/search`, {value}]);
    }

}
