import {Component, OnInit} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {SharedService} from '../shared/services/shared.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    check = false;
    loginError = false;
    form: FormGroup;


    constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private shared: SharedService) {
        if (localStorage.JWT_TOKEN && localStorage.REFRESH_TOKEN) {
            this.router.navigate([`main/myPage`]);
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', [Validators.pattern(/^\w+@\w+\.\w+$/), Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    getAuth(form: NgForm) {
        this.authService.loginUser(form).subscribe(
            result => {
                const res = result.data[0];
                const data = JSON.stringify(res);
                localStorage.setItem('userId', `${res._id}`);
                localStorage.setItem('userData', data);
                this.shared.transferUser(res);
                this.router.navigate([`main/myPage`]);
            }, error => {
                this.loginError = true;
                this.returnTrueFalse();
            });
    }

    returnTrueFalse(): any {
        setTimeout(() => {
            this.loginError = false;
        }, 4000);
    }

}
