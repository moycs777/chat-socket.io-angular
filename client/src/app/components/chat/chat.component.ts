import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userChat = {
    user: '',
    text: ''
  };

  myMessages;
  eventName = 'send-message';

  constructor(
    private activated: ActivatedRoute,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    const id = this.activated.snapshot.params.id;
    this.userChat.user = id;

    this.webSocketService.listen('text-event').subscribe( (data) => {
      this.myMessages = data;
    })
  }

  myMessage(){
    console.log('_ myMessage : this.userChat.text', this.userChat)
    this.webSocketService.emit(this.eventName, this.userChat);
    this.userChat.text = '';
  }

}
