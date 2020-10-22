import './textarea.scss';
import React from 'react';
import Label from '../label/label';
import { TextArea as LibraryTextArea } from 'semantic-ui-react';

interface TextAreaProps {
    placeholder?: string;
    label?: string;
    error?: boolean;
}

const TextArea = ({ placeholder, label, error }: TextAreaProps) => {
    return (
        <div className="textarea">
            {label && <Label text={label} />}
            <LibraryTextArea placeholder={placeholder} error={error} style={{ width: '100%' }} />
        </div>
    );
};

export default TextArea;
