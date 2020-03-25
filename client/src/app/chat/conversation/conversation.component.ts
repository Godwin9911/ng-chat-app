import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { ConversationService } from './conversation.service';
import { Route, ActivatedRoute, ActivatedRouteSnapshot, Router, NavigationStart } from '@angular/router';
import { ContactService } from '../contact-list/contact.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/user/auth.service';
import { Error } from '../../core/error';
import { ScrollToBottomDirective } from 'src/app/scroll-to-bottom.directive';
import { SocketService } from 'src/app/socket.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styles: []
})
export class ConversationComponent implements OnInit, OnDestroy {
  @ViewChild(ScrollToBottomDirective)
  // scroll: ScrollToBottomDirective;
  private subscriptionOne: Subscription;
  private subscriptionTwo: Subscription;
  private subscriptionThree: Subscription;
  errorMessage: Error;
  composedMessage;
  _id;
  loggedInUser = this.authUser.currentUser;
  isloading = false;

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

  constructor(private conversationService: ConversationService,
              private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router,
              private authUser: AuthService,
              private socketService: SocketService) {
    const routerEnv = router.events.subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          this.ngOnDestroy();
          routerEnv.unsubscribe();
        }
      });
}

  ngOnInit() {
    this.conversationService.clearMessages = [];
    this.subscriptionOne = this.socketService
      .getMessages()
      .subscribe({
        next: (msg) => this.conversationService.messages.conversation.push(msg.reply),
        error: (err) => console.log(err)
      });
    const id = this.route.snapshot.paramMap.get('id');
    if (this.route.snapshot.paramMap.get('name') === 'contacts') {
          return this.subscriptionTwo =  this.conversationService.checkConversation(id)
          .subscribe({
            next: data => this.conversationService.messages = data,
            error: (err) => this.errorMessage = err
          });
      }
    this.subscriptionThree = this.conversationService.getMessages(id)
      .subscribe({
        next: data => console.log('get messages'),
        error: (err) => this.errorMessage = err
      });
  }

  ngOnDestroy(): void {
    this.subscriptionOne?.unsubscribe();
    this.subscriptionTwo?.unsubscribe();
    this.subscriptionThree?.unsubscribe();
  }

  sendMessage(form: NgForm) {
    this.isloading = !this.isloading;
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
    return this.isloading = !this.isloading;
   // alert(this.selectedUser._id);
  }



}
