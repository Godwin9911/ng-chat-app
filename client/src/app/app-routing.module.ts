import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { ChatModule } from './chat/chat.module';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'welcome' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    UserModule,
    ChatModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
