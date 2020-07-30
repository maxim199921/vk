import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DataSourceService } from './users/services/data.source.service';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './shared/guards/auth.guards';
import { AuthService } from './shared/services/auth.service';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { ErrorsInterceptor } from './shared/helpers/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedService} from './shared/services/shared.service';
import {PostsService} from './users/services/posts.service';
import {MaterialModule} from './material/material.module';
import { PreloaderComponent } from './preloader/preloader.component';
import {LoaderInterceptor} from './shared/helpers/preloader.interceptor';
import {NgxGalleryModule} from 'ngx-gallery';
import {ConversationService} from './users/services/conversation.service';
import {SharedModule} from './shared/shared.module';
import {ChatService} from './shared/services/chat.service';
import {InfiniteScrollModule} from "ngx-infinite-scroll";


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    PreloaderComponent,
  ],
  imports: [
    NgxGalleryModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    InfiniteScrollModule
  ],
  providers: [ DataSourceService,
    AuthGuard,
    AuthService,
    SharedService,
    PostsService,
    ConversationService,
    ChatService,
    {provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true},
    {provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true},
    {provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true}],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
