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

import uuidv4 from 'uuid';


@WebSocketGateway({ namespace: '/room' })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  private form = {
    1245: {
      title: 'teste',
      timeToResponse: 5,
      questionAct: 0,
      questionInFocus: false,
      questions: [
        {
          alternatives: [],
          correctAlternative: 0,
          question: 'Which is the sky color?',
        },
      ],
      listUsers: [
        {
          id: '',
          nickname: '',
          responses: [

          ]
        }
      ],
    },
  };

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket) {
    const rooms = Object.keys(this.form);
    for (var room of rooms) {
      this.form[room].listUsers.map(user => {
        if (user.id === client.id) {
          console.log(user)
          this.form[room].listUsers = this.form[room].listUsers.slice(this.form[room].listUsers.indexOf(user), 1)
        }
      })
      this.wss.to(room).emit('users', this.form[room].listUsers);
    }
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('enterInRoom')
  handleEnterInRoom(client: Socket, room: string) {
    client.emit('success', 'connected in room: ' + room);
    client.join(room);
    this.form[room].listUsers.push({ id: client.id, name: 'Wesley', responses: [] });
    if (!this.form[room]) {
      console.log("Sala não existe");
    } else {
      // Syncronize
      this.logger.log(this.form[room].title);
      client.emit('title', this.form[room].title);
      client.emit('status', this.form[room].questionAct);
      this.wss.to(room).emit('users', this.form[room].listUsers);
    }
    // if (this.form[room]) {
    //   client.emit('')
    // }
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(client: Socket, room: string, objectCreate: any): void {
    const newIdRoom = uuidv4;
    this.form[newIdRoom] = objectCreate;
    client.join(room);
    client.emit('success', 'connected in room: ' + room);
    this.logger.log(`the client ${client.id} join in the room ${room}`);
    if (this.form[room].title) {
      client.emit('title', this.form[room].title);
    }
  }
}
