import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  log() {
    window.open('/api/auth/google', '_self');
    // window.open('/api/auth/google',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    /*let listener = window.addEventListener('message', (message) => {
      console.log(message);
      //message will contain facebook user and details
    });
    */
  }

}
