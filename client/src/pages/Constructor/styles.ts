import styled from 'styled-components';

export const Container = styled.div`
    margin: 0 auto;
    height: 100vh;

    h1 {
        padding-left: 10%;
    }
`;

export const Header = styled.header`
    padding: 8px;
    margin: auto 0px;
    top: 0px;
    background: #0001;

    span {
        font-family: 'Odibee Sans', cursive;
        font-weight: 400;
        font-size: 2em;
    }
`;

export const Content = styled.div`
    margin: 5% auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    form {
        >div {
            margin: 15px auto;
            >span {
                font-size: 24px;
                font-weight: bold;
            }
        } 
    }

`;

export const QuestionsContent = styled.div`
    min-width: 550px;
    border: solid #4444 1px;

    >div {
        padding: 15px 15px;
        border-bottom: solid #1111 1px;
    }
`

export const AddQuestionsContent = styled.div`
    margin: 10px;
    height: 60px;
    min-width: 550px;
    padding: 15px 15px;
    background: #07f3;
    border: solid #07f9 1px;
    display: flex;
    cursor: pointer;
  
    svg {
        margin: auto;
    }
`

export const AddAlternativeContent = styled.div`
    margin: 5px;
    min-width: 350px;
    padding: 5px;
    background: #0f73;
    border: solid #0f79 1px;
    display: flex;
    cursor: pointer;
  
    svg {
        margin: auto;
    }
`

export const Button = styled.button`
    padding: 15px;
    margin: auto;
    min-width: 100%;
    align-content: center;
    background: linear-gradient(#0f79, #07f9);
    border: none;
    font-size: 26px;
    font-weight: bold;
    color: white;
    box-shadow: 1px 1px 0 0;

`
