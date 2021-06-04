import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    Container,
    Content,
    Header,
    ListPlayers,
    ShowQuestion,
} from './styles'

import { ioRoom as io } from "../../services/socket";

const Room: React.FC = () => {
    const [title, setTitle] = useState('');
    const [currentPath, setCurrentPath] = useState('');

    const id_room = document.location.pathname.split('/')[2];

    useEffect(() => {
        console.log(id_room.toString());
        io.emit('enterOrCreateRoom', id_room.toString());
        io.on('success', (msg: string) => {
            console.log(msg);
        })
        io.on('title', (msg: string) => {
            setTitle(msg);
        })
    }, [])

    const handleTeste = useCallback(
        () => {
            console.log("chamei");
            io.emit('msgToServer', 'Entrei');
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
                    <h2>
                        Witch is sky color?
                    </h2>
                    <div>
                        <span onClick={() => handleTeste()}>A. Black</span>
                        <span>B. Yellow</span>
                        <span>C. White</span>
                        <span>D. Blue</span>
                    </div>
                </ShowQuestion>
                <ListPlayers>
                    <div>
                        <span>Wesley</span>
                    </div>
                    <div>
                        <span>Lucas</span>
                    </div>
                    <div>
                        <span>Alex</span>
                    </div>
                </ListPlayers>
            </Content>
        </Container>
    )
}

export default Room
