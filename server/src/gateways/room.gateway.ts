/* eslint-disable indent */
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
import { Rooms } from 'src/@types/room';

import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({ namespace: '/room' })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  private rooms: Rooms = {
    '1245': {
      title: 'Teste',
      timeToResponse: 5,
      currentQuestion: 0,
      status: 'WaitStart',
      questions: [
        {
          alternatives: [],
          correctAlternative: 0,
          question: 'Which is the sky color?',
        },
      ],
      listUsers: [],
    },
  };

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('enterInRoom')
  handleEnterInRoom(client: Socket, [idroom, username]: any[]) {
    console.log(idroom, username);
    const thisRoom = this.rooms[idroom];
    if (!thisRoom) {
      console.log('Sala não existe');
      client.emit('roomnotfound');
      return;
    }
    client.join(idroom);
    client.emit('success', 'connected in room: ' + idroom);

    let template = []
    for (let i = 0; i < thisRoom.questions.length; i++) {
        template.push(-1)
    }

    thisRoom.listUsers.push({
      id: client.id,
      name: username,
      responses: template,
    });

    // Syncronize
    this.wss.to(idroom).emit('users', thisRoom.listUsers);
    client.emit('title', thisRoom.title);
    client.emit('status', thisRoom.status);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    const thisRoom = this.rooms[room];
    thisRoom.listUsers.map((user) => {
      if (user.id === client.id) {
        this.rooms[room].listUsers = thisRoom.listUsers.splice(
          thisRoom.listUsers.findIndex((user) => user.id === client.id),
          1,
        );
      }
    });
    this.wss.to(room).emit('users', this.rooms[room].listUsers);
    client.leave(room);
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(client: Socket, objectCreate: any): void {
    objectCreate.listUsers = [];
    objectCreate.currentQuestion = -1;
    objectCreate.status = 'WaitStart';

    const newIdRoom = uuidv4().slice(9, 18);
    this.rooms[newIdRoom] = objectCreate;
    client.join(newIdRoom);
    client.emit('success', 'create room: ' + newIdRoom);
    console.log(newIdRoom);
    client.emit('idroom', newIdRoom);

    // setup client
    client.emit('title', objectCreate.title);
    client.emit('status', objectCreate.status);
    this.rooms[newIdRoom].listUsers.push({
      id: client.id,
      name: 'admin',
      responses: [],
    });
    this.wss.to(newIdRoom).emit('users', this.rooms[newIdRoom].listUsers);
    console.log(this.rooms[newIdRoom]);
  }

  @SubscribeMessage('nextQuestion')
  handleNextQuestion(client: Socket, room: any) {
    const thisRoom = this.rooms[room];
    const userFinded = thisRoom.listUsers.find((user) => user.id === client.id);
    
    if (!userFinded) {
        console.log(thisRoom.listUsers);
        return
    };

    const isFirstUser = thisRoom.listUsers.indexOf(userFinded) !== 0;
    if (isFirstUser) {
        console.log('is not first');
        return
    };
    
    const newCurrentQuestion = thisRoom.currentQuestion + 1;
    console.log('number next question: ' + newCurrentQuestion + '/' + (thisRoom.questions.length - 1));
    
    if (newCurrentQuestion >= thisRoom.questions.length){
        this.wss.to(room).emit('status', 'Finished');
        console.log(thisRoom.listUsers)
        return;
    }
    
    this.rooms[room].currentQuestion = newCurrentQuestion;
    this.wss
      .to(room)
      .emit(
        'newQuestion',
        thisRoom.questions[newCurrentQuestion].question,
        thisRoom.questions[newCurrentQuestion].alternatives,
      );
    this.wss.to(room).emit('status', 'InQuestion');
    setTimeout(() => {
        this.wss.to(room).emit('status', 'Transition');

        // verifica se todos responderam, quem não respondeu preencha-se com -1
        return;
    }, thisRoom.timeToResponse * 1000)
  }

  @SubscribeMessage('responseQuestion')
  handleReponseQuestion(client: Socket, [room, index_response]: any) {
    console.log('response: ', room, index_response);
    const thisRoom = this.rooms[room];

    let index_user = null;

    thisRoom.listUsers.forEach((user, index, _) => {
        console.log(user.id, client.id);
        if (user.id === client.id) {
            index_user = index;
        }
    })

    if (!index_user) return;

    console.log(index_user);

    this.rooms[room].listUsers[index_user].responses[thisRoom.currentQuestion] = index_response;
  }
}
