import './label.scss';
import React from 'react';

interface LabelProps {
    text: string;
}

const Label = ({ text }: LabelProps) => {
    return <div className="label">{text}</div>;
};

export default Label;
