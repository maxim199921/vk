import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataSourceService} from '../services/data.source.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs/index';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
    public editForm: FormGroup;
    public countries: Array<any>;
    private dataUser: any;
    public invalidPassCheck = false;
    private subscription: Subscription = new Subscription();

    constructor(private shared: SharedService,
                private dataSource: DataSourceService,
                private router: Router,
                private fb: FormBuilder) {
        this.countries = environment.countries;
    }

    ngOnInit() {

        this.editForm = this.fb.group({
            email: ['', [Validators.pattern(/^\w+@\w+\.\w+$/), Validators.required]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            country: ['', Validators.required],
            age: ['', Validators.required],
            oldPassword: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        }, {validators: Validators.nullValidator});

        this.subscription.add(this.dataSource.initUser().subscribe((result) => {
            this.shared.transferUser(result[0]);
            this.dataUser = result[0];
            delete result[0].password;
            this.editForm.patchValue(result[0]);
        }));

    }

    get email() {
        return this.editForm.get('email');
    }

    get firstName() {
        return this.editForm.get('firstName');
    }

    get age() {
        return this.editForm.get('age');
    }

    get country() {
        return this.editForm.get('country');
    }

    get lastName() {
        return this.editForm.get('lastName');
    }

    get oldPassword() {
        return this.editForm.get('oldPassword');
    }

    get password() {
        return this.editForm.get('password');
    }

    get confirmPassword() {
        return this.editForm.get('confirmPassword');
    }

    regUser(frmReg: any): void {
        delete frmReg.confirmPassword;
        frmReg._id = this.dataUser._id;
        this.subscription.add(this.dataSource.updateData(frmReg).subscribe((info) => {
            this.dataSource.getOneDataById(frmReg._id).subscribe((info) => {
                const res = {...info[0]};
                this.shared.transferUser(res);
                this.router.navigate(['main/myPage']);
            });
        },
        error => {
            this.invalidPassCheck = true;
        }));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
