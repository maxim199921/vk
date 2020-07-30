import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { DataSourceService } from '../users/services/data.source.service';
import {Router} from '@angular/router';
import {ConfirmPasswordValidator} from './confirm-password.validator';
import {environment} from '../../environments/environment';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  countries: Array<any>;

  constructor(private dataSource: DataSourceService, private router: Router, private fb: FormBuilder) {
    if (localStorage.JWT_TOKEN && localStorage.REFRESH_TOKEN) {
        this.router.navigate([`main/myPage`]);
    }
    this.countries = environment.countries;
  }

  ngOnInit() {
    this. registerForm = this.fb.group({
      email: ['' , [Validators.pattern(/^\w+@\w+\.\w+$/), Validators.required ],
        [ConfirmPasswordValidator.loginAsyncValidator(this.dataSource)]],
      firstName: ['' , Validators.required ],
      lastName: ['' , Validators.required ],
      country: ['' , Validators.required ],
      age: ['' , Validators.required ],
      password: ['' , [Validators.required , Validators.minLength(6)]],
      confirmPassword: ['' , [Validators.required , Validators.minLength(6)]]
    }, {validators: [ConfirmPasswordValidator.MatchPassword ]});
  }
  isLoginTaken(): boolean {
    return this.registerForm.get('email').hasError('loginExist');
  }
  get email() {
    return this.registerForm.get('email');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get age() {
    return this.registerForm.get('age');
  }
  get country() {
    return this.registerForm.get('country');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }


  regUser(frmReg: any): void {
    delete frmReg.confirmPassword;
    this.dataSource.registrUser(frmReg).subscribe((info) => {
    this.router.navigate(['login']);
});
}

}









