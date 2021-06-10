import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    Container,
    Content,
    Header,
    ListPlayers,
    ShowQuestion,
} from './styles'

import { ioRoom as io } from "../../services/socket";
import { useHistory } from 'react-router-dom';
import { useRoom } from '../../hooks/room';

interface User {
    name: string;
}

type IStatus = 'InQuestion' | 'WaitStart' | 'Transition' | 'Fineshed';


const Room: React.FC = () => {
    const history = useHistory();
    const { roomData } = useRoom()
    const [title, setTitle] = useState<string>('');
    const [idRoom, setIdRoom] = useState('');
    const [status, setStatus] = useState<IStatus>('WaitStart');
    const [users, setUsers] = useState<User[]>([] as User[]);
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [alternatives, setAlternatives] = useState<string[]>([]);

    useEffect(() => {
        let name: string | null = '';
        const id_room = document.location.pathname.split('/')[2];
        console.log(id_room);
        setIdRoom(document.location.pathname.split('/')[2])

        // setup
        if (roomData.title) {
            console.log(roomData);
            io.emit('createRoom', roomData);
        } else if (!!id_room) {
            name = prompt('Diga-nos qual é o seu nome');
            io.emit('enterInRoom', id_room.toString(), name);
        } else {
            return history.push('/');
        }

        io.on('success', (msg: string) => {
            console.log(msg);
        })
        io.on('status', (newStatus: string) => {
            let sendStatus: IStatus = 'WaitStart';
            switch (newStatus){
                case 'InQuestion':
                    sendStatus = newStatus;
                    break;
                case 'WaitStart':
                    sendStatus = newStatus;
                    break;
                case 'Transition':
                    sendStatus = newStatus;
                    break;
                case 'Fineshed':
                    sendStatus = newStatus;
            }
            console.log('status: ' + sendStatus);
            setStatus(sendStatus);
        })
        io.on('idroom', (idrrom: string) => {
            console.log(`/room/${idrrom}`);
            history.push(`/room/${idrrom}`)
        })
        io.on('title', (newTitle: string) => {
            console.log(newTitle);
            setTitle(newTitle);
        })
        io.on('roomnotfound', () => {
            return history.push('/')
        })
        io.on('users', (usersReceived: User[]) => setUsers(usersReceived));
        window.addEventListener("beforeunload", function (e) {
            let confirmationMessage = "o/";
            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            console.log("logout !");

            io.emit('leaveRoom', id_room.toString());

            return confirmationMessage; //Webkit, Safari, Chrome
        });

        // InRoom
        io.on('newQuestion', (question: string, alternatives: string[]) => {
            console.log(question);
            console.log(alternatives);
            setCurrentQuestion(question);
            setAlternatives(alternatives);
        })
    }, [history])

    const handleNextQuestion = useCallback(
        () => {
            console.log(idRoom);
            io.emit('nextQuestion', document.location.pathname.split('/')[2]);
        },
        [],
    );

    const handletoAskQuestion = useCallback(
        (index) => {
            console.log('ask index: '+index);
            io.emit('ask', index);
        },
        [],
    );

    return (
        <Container>
            <Header>
                <h1 className="text-title">Room {title}</h1>
            </Header>
            <Content>
                <ShowQuestion>
                <section >
                    <button onClick={handleNextQuestion}>{status === 'WaitStart' ? 'Start' : 'Next Question'}</button>
                </section>
                    {status === 'WaitStart' ? <>
                        <h1>
                            Hello! Welcome to the quizz!
                        </h1>
                        <p>Wait the quizz to start!</p>
                    </> : null
                    }
                    {status === 'InQuestion' ? <> 
                        <h2>
                            {currentQuestion}
                        </h2>
                        <div>
                            {alternatives.map((alternative, index)  => (
                                <span key={`alternative-${index}`} onClick={() => handletoAskQuestion(index)}>{alternative}</span>
                            ))}
                        </div>
                    </> : null}
                </ShowQuestion>
                <ListPlayers>
                    {users.map(user => (
                        <div key={user.name}>
                            <span>{user.name}</span>
                        </div>
                    ))}
                </ListPlayers>
            </Content>
        </Container>
    )
}

export default Room
