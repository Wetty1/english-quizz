import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300;400&family=Odibee+Sans&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    body {
        -webkit-font-smoothing: antialised;
        font-size: 16px;
        min-width: 350px;
    }

    button {
        cursor: pointer;
    }

    h1 {
        font-family: 'Odibee Sans', cursive !important;
    }

    .text-common {
        font-family: 'Dosis', sans-serif;
        font-weight: 300;
        font-size: 16px;
    }
`;
