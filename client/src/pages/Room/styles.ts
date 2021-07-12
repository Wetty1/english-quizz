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
    height: 8vh;
    margin: auto 0px;
    top: 0px;
    color: white;
    background: #B22234;
`;

export const Content = styled.div`
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const MainContent = styled.div`
    background: #3C3B6E;
    width: 83%;
    height: 92vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    div {
        min-height: 20vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        span {
            cursor: pointer;
        }
    }
`

export const ColumnInfo = styled.div`
    max-width: 350px;
    width: 17%;
    height: 92vh;
    display: flex;
    justify-content: stretch;
    flex-direction: column;

    >div {
        height: 80%;

        >div {
            margin: 10px 10px;

            .itsme {
                color: blue;
            }
        }
    }

    .admin-control {
        height: 20%;
        background-color: yellow;
    }
`

export const Button = styled.button`
    padding: 15px;
    margin: auto;
    min-width: 300px;
    align-content: center;
    background: linear-gradient(#0f79, #07f9);
    border: none;
    font-size: 26px;
    font-weight: bold;
    color: white;
    box-shadow: 1px 1px 0 0;

`
