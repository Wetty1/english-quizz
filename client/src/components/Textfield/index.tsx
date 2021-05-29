/* eslint-disable react/prop-types */
import { useField } from '@unform/core';
import React, {
    InputHTMLAttributes, useCallback, useEffect, useRef, useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface PropsInput extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    width?: string;
    value?: any;
    icon?: React.ComponentType<IconBaseProps>;
}

const Textfield: React.FC<PropsInput> = ({
    name,
    icon: Icon,
    width,
    placeholder,
    ...rest
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const {
        fieldName, defaultValue, error, registerField,
    } = useField(name);

    const handleOnFocused = useCallback(
        () => {
            setIsFocused(true);
        },
        [],
    );

    const hadleOnBlur = useCallback(
        () => {
            setIsFocused(false);
            setIsFilled(!!inputRef.current?.value);
        },
        [],
    );

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container 
            width={width} 
            hasIcon={!!Icon} 
            placeholder={placeholder} 
            isFocused={!!isFocused}
            isFilled={!!isFilled}
            isErrored={false}
        >
            <input
                ref={inputRef}
                defaultValue={defaultValue}
                onFocus={handleOnFocused}
                onBlur={hadleOnBlur}
                placeholder={placeholder}
                name={name}
                {...rest}
            />
            <span>{placeholder}</span>
        </Container>
    );
};
export default Textfield;
