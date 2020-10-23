import './dropdown.scss';
import React, { SyntheticEvent, memo } from 'react';
import Label from '../label/label';
import {
    Dropdown as LibraryDropdown,
    DropdownItemProps,
    DropdownProps as LibraryDropdownProps,
} from 'semantic-ui-react';

interface DropdownProps {
    placeholder: string;
    label?: string;
    error?: boolean;
    options: DropdownItemProps[];
    disabled?: boolean;
    onChange(event: SyntheticEvent<HTMLElement>, data?: LibraryDropdownProps): void;
}

const Dropdown = memo(({ label, ...props }: DropdownProps) => {
    return (
        <div className="dropdown">
            {label && <Label text={label} />}
            <LibraryDropdown selection fluid {...props} />
        </div>
    );
});

export default Dropdown;
