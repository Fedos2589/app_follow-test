import './main-form.scss';
import React from 'react';
import { Country, CompanyData } from '../../containers/main-page/main-page';

interface MainFormProps {
    countries: Country[];
    companyData: CompanyData;
}

const MainForm = ({ countries, companyData }: MainFormProps) => {
    return <div className="main-form">main form</div>;
};

export default MainForm;
