import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styles: []
})
export class ChatsComponent implements OnInit {
  errorMessage: Error;

  get conversations() {
    return this.contactService.coversations;
  }

  get imageData() {
    return `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`;
  }

  constructor(private contactService: ContactService,
              private router: Router) { }

  ngOnInit(): void {
    this.contactService.getConversations()
      .subscribe({
        // next: (data) => this.conversations = data,
        error: (err) => this.errorMessage = err
      });
  }

  viewMessages(selectedUser, conversationId) {
    this.contactService.selUser = selectedUser;
    this.router.navigateByUrl(`/conversation/chat/${conversationId}`);
  }


}
