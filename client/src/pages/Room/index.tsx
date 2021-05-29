import React, { useEffect } from 'react'
import Socket from 'socket.io-client';
import { Container, Content, Header } from './styles'


const Room: React.FC = () => {
    const io = Socket('http://localhost:3001', {
        transports: ['websocket'],
    })

    useEffect(() => {
        io.emit('connection');
        io.emit('joinroom', 'abc')
        io.on('success', (msg) => {
            console.log(msg);
        })
    }, [])

    return (
        <Container>
            <Header>
                <span className="text-title" >Homepage</span>
            </Header>
            <Content>
                <span>Arroz</span>
                <p>feijão</p>
                <span>feijão</span>
            </Content>
        </Container>
    )
}

export default Home
