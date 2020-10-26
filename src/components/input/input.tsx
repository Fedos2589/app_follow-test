import './input.scss';
import React, { memo, ChangeEvent } from 'react';
import Label from '../label/label';
import { Input as LibraryInput, InputOnChangeData } from 'semantic-ui-react';

interface InputProps {
    placeholder?: string;
    label?: string;
    error?: boolean;
    value?: string;
    onChange?(e: ChangeEvent, data: InputOnChangeData): void;
    onBlur?(): void;
}

const Input = memo(({ label, ...props }: InputProps) => {
    return (
        <div className="input">
            {label && <Label text={label} />}
            <LibraryInput fluid {...props} />
        </div>
    );
});

export default Input;
