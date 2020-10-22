import './input.scss';
import React from 'react';
import Label from '../label/label';
import { Input as LibraryInput } from 'semantic-ui-react';

interface InputProps {
    placeholder?: string;
    label?: string;
    error?: boolean;
}

const Input = ({ placeholder, label, error }: InputProps) => {
    return (
        <div className="input">
            {label && <Label text={label} />}
            <LibraryInput placeholder={placeholder} error={error} />
        </div>
    );
};

export default Input;
