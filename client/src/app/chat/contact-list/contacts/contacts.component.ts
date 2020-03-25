import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { ConversationService } from '../../conversation/conversation.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styles: []
})
export class ContactsComponent implements OnInit {
  errorMessage: Error;

  get contacts() {
    return this.contactService.contacts;
  }

  get imageData() {
    return `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`;
  }

  constructor(private contactService: ContactService,
              private conversationService: ConversationService,
              private router: Router,
              private spinner: NgxSpinnerService
              ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.contactService.getContacts()
      .subscribe({
        // next: (data) => this.conversations = data,
        error: (err) => this.errorMessage = err,
        complete: () => this.spinner.hide()
      });
  }

  checkConversation(contact){
    this.contactService.selUser = contact;
    this.router.navigateByUrl(`/conversation/contacts/${contact._id}`);
  }

}
