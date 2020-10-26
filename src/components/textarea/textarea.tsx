import './textarea.scss';
import React, { memo, ChangeEvent } from 'react';
import Label from '../label/label';
import { TextArea as LibraryTextArea } from 'semantic-ui-react';

interface TextAreaProps {
    placeholder?: string;
    label?: string;
    value?: number | string;
    onChange?(e: ChangeEvent, data: TextAreaProps): void;
    onBlur?(): void;
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
