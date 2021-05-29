import styled from 'styled-components';

export const Container = styled.div`
    margin: 0 5%;
    background: gray;
    height: 100vh;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    span {
        font-family: 'Odibee Sans', cursive;
        font-weight: 400;
    }
    p {
        font-family: 'Dosis', sans-serif;
        font-weight: 300;
        font-size: 16px;
    }
`;

export const Header = styled.header`
    padding: 8px;
    margin: auto 0px;
    top: 0px;
    background: green;

    span {
        font-family: 'Odibee Sans', cursive;
        font-weight: 400;
        font-size: 2em;
    }
`;