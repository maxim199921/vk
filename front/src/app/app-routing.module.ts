import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthGuard} from './shared/guards/auth.guards';
import {SharedService} from './shared/services/shared.service';

const routes: Routes = [
    {
        path: `main`,
        loadChildren: './users/users.module#UsersModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

    constructor(private shared: SharedService) {}

}
