import {AbstractControl,  FormControl} from '@angular/forms';
import {DataSourceService} from '../users/services/data.source.service';
import { timer} from 'rxjs';
import { map, switchMap} from 'rxjs/operators';


export class ConfirmPasswordValidator {
  static MatchPassword(formControl: AbstractControl) {
    const password = formControl.get('password').value;

    const confirmPassword = formControl.get('confirmPassword').value;

    if (password != confirmPassword) {
      formControl.get('confirmPassword').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }

  static loginAsyncValidator = (authService: DataSourceService, time: number = 500) => {
    return (input: FormControl) => {
      return timer(500).pipe(
        switchMap(() => authService.checkEmail(input.value)),
        map(res => {
          return res.isLoginAvailable ? null : {loginExist: true};      })
      );
    };
  };
}
