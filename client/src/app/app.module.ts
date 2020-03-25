import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';
import { SocketService } from './socket.service';
import { AuthService } from './user/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ScrollToBottomDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    UserModule,
    AppRoutingModule
    // SocketIoModule.forRoot(config)
  ],
  providers: [AuthService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
