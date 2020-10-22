import './main-form.scss';
import React, { useMemo } from 'react';
import { Country, CompanyData } from '../../containers/main-page/main-page';
import Input from '../input/input';
import ErrorBoundery from '../error-boundery/error-boundery';
import Dropdown from '../dropdown/dropdown';
import TextArea from '../textarea/textarea';

interface MainFormProps {
    countries: Country[];
    companyData: CompanyData;
}

const MainForm = ({ countries, companyData }: MainFormProps) => {
    const countryOptions = useMemo(
        () =>
            countries.map(({ country }) => ({
                key: country,
                text: country,
                value: country,
            })),
        [countries],
    );

    return (
        <div className="main-form">
            <h2 className="main-form__title">Billing Details</h2>
            <ErrorBoundery>
                <Input label="Customer full name" placeholder="e.g. John Smith" />
            </ErrorBoundery>
            <ErrorBoundery>
                <Dropdown label="Country" placeholder="Select country" options={countryOptions} />
            </ErrorBoundery>
            <ErrorBoundery>
                <TextArea label="Address" placeholder="e.g. 2450 Iroquois Ave." />
            </ErrorBoundery>
        </div>
    );
};

export default MainForm;
