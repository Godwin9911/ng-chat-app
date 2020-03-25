import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { SocketService } from 'src/app/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styles: []
})
export class ChatsComponent implements OnInit, OnDestroy {
  errorMessage: Error;
  private subscription: Subscription;

  get conversations() {
    return this.contactService.coversations;
  }

  /*get imageData() {
    return `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`;
  }
  */
 imageData = `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`;

  constructor(private contactService: ContactService,
              private router: Router,
              private socketService: SocketService) {

    const routerEnv = router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        this.ngOnDestroy();
        routerEnv.unsubscribe();
      }
    });
  }

  ngOnInit() {
    this.contactService.getConversations()
      .subscribe({
        // next: (data) => this.conversations = data,
        error: (err) => this.errorMessage = err
      });

    this.subscription = this.socketService
      .getMessages()
      .subscribe((msg) => {
        const senderId = msg.reply.author;
        const conversations = this.contactService.coversations.conversations;

        if (msg.newChat) {
          this.ngOnDestroy();
          return this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/chat']);
          });
        }

        conversations.forEach((conversation, i) => {
          if (conversation['0']._id === senderId ) {
            conversation.message[0].body = msg.reply.body;
            conversation.unreadCount = conversation.unreadCount + 1;
            conversations.splice(i, 1);
            conversations.unshift(conversation);
          }
        });

        return this.contactService.coversations.conversations = [...conversations];

      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  viewMessages(selectedUser, conversationId) {
    this.contactService.selUser = selectedUser;
    this.router.navigateByUrl(`/conversation/chat/${conversationId}`);
  }


}
