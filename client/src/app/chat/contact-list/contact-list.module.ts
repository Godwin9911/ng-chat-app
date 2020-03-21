import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { ChatsComponent } from './chats/chats.component';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [ContactsComponent, ChatsComponent, SettingsComponent],
  imports: [
    CommonModule
  ]
})
export class ContactListModule { }
