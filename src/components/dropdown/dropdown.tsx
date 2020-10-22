import './dropdown.scss';
import React from 'react';
import Label from '../label/label';
import { Dropdown as LibraryDropdown, DropdownItemProps } from 'semantic-ui-react';

interface DropdownProps {
    placeholder: string;
    label?: string;
    error?: boolean;
    options: DropdownItemProps[];
}

const Dropdown = ({ placeholder, label, error, options }: DropdownProps) => {
    return (
        <div className="dropdown">
            {label && <Label text={label} />}
            <LibraryDropdown placeholder={placeholder} options={options} error={error} selection />
        </div>
    );
};

export default Dropdown;
