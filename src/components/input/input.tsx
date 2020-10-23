import './input.scss';
import React, { memo } from 'react';
import Label from '../label/label';
import { Input as LibraryInput } from 'semantic-ui-react';

interface InputProps {
    placeholder?: string;
    label?: string;
    error?: boolean;
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
