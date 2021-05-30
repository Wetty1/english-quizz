import React, { useCallback, useEffect, useState } from 'react'
import Socket from 'socket.io-client';
import {
    Container,
    Content,
    Header,
    ListPlayers,
    ShowQuestion,
} from './styles'


const Room: React.FC = () => {
    const [currentPath, setCurrentPath] = useState('');

    // const io = Socket('http://localhost:3001', {
    //     transports: ['websocket'],
    // })

    const setPath = useCallback(
        () => {
            setCurrentPath('/')
        },
        [],
    )

    useEffect(() => {
        // io.emit('connection');
        // io.emit('joinroom', 'abc')
        // io.on('success', (msg) => {
        //     console.log(msg);
        // })
    }, [currentPath])

    return (
        <Container>
            <Header>
                <h1 className="text-title">Room title</h1>
            </Header>
            <Content>
                <ShowQuestion>
                    <h2>
                        Witch is sky color?
                    </h2>
                    <div>
                        <span>A. Black</span>
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
