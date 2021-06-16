import styled from 'styled-components';

export const Container = styled.div`
    margin: 0 auto;
    height: 100vh;

    h1 {
        padding-left: 10%;
    }
`;

export const Header = styled.header`
    position: sticky;
    top: 0;
    left: 0;
    padding: 8px;
    margin: auto 0px;
    background: #FFFFFF;
    box-sizing: border-box;
    box-shadow: inset 0 -0.125rem #f2f2f2;
    transition: transform 0.3s, -webkit-transform 0.3s;
    z-index: 12;

    h1 {
        font-family: 'Odibee Sans', cursive;
        font-size: 2em;
        color: #333;
        font-weight: 700;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
`;

export const Content = styled.div`
    margin: 3% auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    form {
      width: 90%;
      max-width: 768px;
      padding: 20px 30px;
      border-radius: 10px;

      @media(max-width: 580px) {
        width: 100%;
      }

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
    /* min-width: 550px; */
    border: solid #4444 1px;

    >div {
        padding: 15px 15px;
        border-bottom: solid #1111 1px;
    }
`

export const AddQuestionsContent = styled.div`
    margin: 15px;
    /* min-width: 550px; */
    padding: 5px;
    background: #07f3;
    border: solid #07f9 1px;
    display: flex;
    cursor: pointer;
  
    svg {
        margin: auto;
    }
`

export const AddAlternativeContent = styled.div`
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
