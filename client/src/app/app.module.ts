import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SocketService } from './socket.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ScrollToBottomDirective
  ],
  imports: [
    CoreModule,
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    UserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [SocketService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
