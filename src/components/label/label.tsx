import './label.scss';
import React, { memo } from 'react';

interface LabelProps {
    text: string;
}

const Label = memo(({ text }: LabelProps) => {
    return <div className="label">{text}</div>;
});

export default Label;
