import React from 'react'
import { Container, Content, Header } from './styles'

const Home: React.FC = () => {
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
