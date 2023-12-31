import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FakeBackendProvider } from './shared/fake-backend';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { TestComponent } from './components/test/test.component';

import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { JwtInterceptor } from './shared/jwt-interceptor';
import {ErrorInterceptor} from './shared/error-interceptor';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserInfoButtonComponent } from './components/user-info-button/user-info-button.component';
import { UserInfoCardComponent } from './components/user-info-card/user-info-card.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // TestComponent,
    LoginComponent,
    HttpClientModule,
    UsersTableComponent,
    UserInfoButtonComponent,
    UserInfoCardComponent,
    FormsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    

  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
