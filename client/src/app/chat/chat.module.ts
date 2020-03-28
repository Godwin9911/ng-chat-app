import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation/conversation.component';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatsComponent } from './contact-list/chats/chats.component';
import { ContactsComponent } from './contact-list/contacts/contacts.component';
import { SettingsComponent } from './contact-list/settings/settings.component';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../socket.service';
import { AuthGuard } from '../user/auth.guard';
import { TimePipe } from '../core/time-pipe.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    TimePipe,
    ConversationComponent,
    ChatComponent,
    ChatsComponent,
    ContactsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'conversation/:name/:id',
        component: ConversationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'current-chats', pathMatch: 'full' },
          { path: 'current-chats', component:  ChatsComponent},
          { path: 'contacts', component: ContactsComponent },
          { path: 'settings', component: SettingsComponent }
        ]
      },
    ]),
    NgxSpinnerModule,
  ],
  providers: [
    NgxSpinnerModule,
    SocketService,
    AuthGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatModule { }
