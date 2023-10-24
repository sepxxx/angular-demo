import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FakeBackendProvider } from './shared/fake-backend';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TestComponent } from './components/test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TestComponent,
    LoginComponent,
  ],
  providers: [FakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
