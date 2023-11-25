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
import {ErrorInterceptor} from './shared/error-interceptor'

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
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    

  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
