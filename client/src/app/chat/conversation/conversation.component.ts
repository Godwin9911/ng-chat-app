import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { ConversationService } from './conversation.service';
import { Route, ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ContactService } from '../contact-list/contact.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/user/auth.service';
import { Error } from '../../core/error';
import { ScrollToBottomDirective } from 'src/app/scroll-to-bottom.directive';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styles: []
})
export class ConversationComponent implements OnInit {
  @ViewChild(ScrollToBottomDirective)
  // scroll: ScrollToBottomDirective;
  errorMessage: Error;
  composedMessage;
  _id;
  loggedInUser = this.authUser.currentUser;

  get messages() {
    return this.conversationService.messages;
  }

  updateMessages(msg) {
    // console.log(msg);
    // console.log(...this.conversationService.messages.conversation);
   // this.conversationService.messages.conversation = [ ...this.conversationService.messages.conversation, msg];
   if (Array.isArray(this.conversationService.messages.conversation)) {
      return this.conversationService.messages.conversation.push(msg);
   }
   return this.conversationService.messages.conversation = [ msg ];
  }

  get selectedUser() {
    return this.contactService.selectedUser;
  }

  /*get loggedInUser() {
    return this.authUser.currentUser;
  }
  */

  constructor(private conversationService: ConversationService,
              private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router,
              private authUser: AuthService) { }

  ngOnInit() {
    this.conversationService.clearMessages = [];
    const id = this.route.snapshot.paramMap.get('id');
    if (this.route.snapshot.paramMap.get('name') === 'contacts') {
        return this.conversationService.checkConversation(id)
        .subscribe({
          next: data => this.conversationService.messages = data,
          error: (err) => this.errorMessage = err
        });
    }
    this.conversationService.getMessages(id)
    .subscribe({
      // next: data => console.log(data),
      error: (err) => this.errorMessage = err
    });
  }

  sendMessage(form: NgForm) {
    if (form.valid) {
      const { composedMessage } = form.value;
      // console.log(form.value);
      this.conversationService.sendMessage(composedMessage, this.selectedUser._id)
        .subscribe({
          next: data => this.updateMessages({
            id: data.reply._id,
            body: data.reply.body,
            author: {
                _id: data.reply.author
            },
            createdAt: data.reply.createdAt
          }),
          error: (err)  => this.errorMessage = err
        });
    }
    form.resetForm();
   // alert(this.selectedUser._id);
  }

}
