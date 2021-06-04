import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/room' })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  private form = {
    1245: {
      title: 'arroz',
      timeToResponse: 5,
      questionAct: 0,
      questions: [
        {
          alternatives: [],
          correctAlternative: 0,
          question: 'Which is the sky color?',
        },
      ],
    },
  };

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    console.log(text);
    this.wss.emit('success', text);
    // return { event: 'msgToClient', data: text };
  }

  @SubscribeMessage('enterOrCreateRoom')
  handleEnterOrCreateRoom(client: Socket, room: string): void {
    client.join(room);
    this.logger.log(`the client ${client.id} join in the room ${room}`);
    client.emit('success', 'connected in room: ' + room);
    if (this.form[room].title) {
      client.emit('title', this.form[room].title);
    }
  }
}
