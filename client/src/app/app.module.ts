import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';
import { AuthService } from './user/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ScrollToBottomDirective
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    UserModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  providers: [AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
