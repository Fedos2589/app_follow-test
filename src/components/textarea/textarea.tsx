import './textarea.scss';
import React, { memo } from 'react';
import Label from '../label/label';
import { TextArea as LibraryTextArea } from 'semantic-ui-react';

interface TextAreaProps {
    placeholder?: string;
    label?: string;
    error?: boolean;
}

const TextArea = memo(({ label, ...props }: TextAreaProps) => {
    return (
        <div className="textarea">
            {label && <Label text={label} />}
            <LibraryTextArea style={{ width: '100%' }} {...props} />
        </div>
    );
});

export default TextArea;
