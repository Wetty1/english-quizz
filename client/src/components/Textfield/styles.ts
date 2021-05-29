import styled, { css } from 'styled-components';

interface InputContainer {
    width?: string;
    hasIcon: boolean;
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<InputContainer>`
    --color-primary: #009898;
    --color-secundary: #99a;
    --color-error: #c53030;

    background-color: inherit;
    padding: 10px;
    border: 0.726727px solid #a3a3a3;
    border-radius: 4.36036px;
    width: ${props => (props.width ? props.width : '100%')};
    font-size: 18px;
    color: #a3a3a3;
    box-sizing: border-box;
    position: relative;

    display: flex;
    align-items: center;

    ${props =>
        props.isErrored &&
        css`
            color: var(--color-error);
            border-color: var(--color-error);
        `}

    ${props =>
        props.isFocused &&
        css`
            color: var(--color-primary);
            border-color: var(--color-primary);
        `}

    ${props =>
        props.isFilled &&
        css`
            color: var(--color-primary);

            span:first-of-type {
                font-size: 15px;
                color: var(--color-secundary);
                transform: translate3d(
                    ${props.hasIcon ? '-8px' : '0'},
                    -22px,
                    0
                );
                padding: 0 10px;
            }
        `}

    svg {
        margin-right: 8px;
    }

    span:first-of-type {
        position: absolute;
        top: 12px;
        left: ${props => (props.hasIcon ? '35' : '10')}px;
        white-space: nowrap;
        /*    font-size: 18px;
        font-weight: 500; */

        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 14px;

        transform: translate3d(0, 0, 0);
        transition: all 0.2s ease;
        pointer-events: none;
        background: inherit;
    }

    .slidemotion {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0001;
        z-index: -1;
        transform: scaleX(0);
        transform-origin: left;
    }

    input {
        background: transparent;
        border: 0;
        flex: 1;
        width: 100%;
        height: 20px;
        /*   font-weight: 500;
        font-size: 18px; */
        color: var(--color-primary);
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 14px;

        &::placeholder {
            color: transparent;
        }

        &:not(:placeholder-shown) {
            + span {
                font-size: 15px;
                padding: 0 10px;
                color: var(--color-secundary);
                transform: translate3d(
                    ${props => (props.hasIcon ? '-8px' : '0')},
                    -22px,
                    0
                );
            }
        }

        &:focus .slidemotion {
            transform: scaleX(1);
            transition: all 0.1s ease;
            z-index: 2;
        }

        &:focus {
            outline: none;

            + span:first-of-type {
                font-size: 15px;
                color: var(--color-primary);
                transform: translate3d(
                    ${props => (props.hasIcon ? '-8px' : '0')},
                    -22px,
                    0
                );
                padding: 0 10px;
            }

            + .slidemotion {
                transform: scaleX(1);
                transition: all 0.1s ease;
                z-index: 2;
            }
        }
    }
`;

// export const Error = styled(Tooltip)`
//     height: 20px;
//     margin-left: 16px;

//     svg {
//         margin: 0;
//     }

//     span {
//         background: #c53030;
//         color: #fff;

//         &::before {
//             border-color: #c53030 transparent;
//         }
//     }
// `;
