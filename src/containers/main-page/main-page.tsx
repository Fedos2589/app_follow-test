import './main-page.scss';
import React, { useState, useCallback, useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
import MainForm from '../../components/main-form/main-form';

export interface Country {
    country: string;
    states?: string[];
}

export interface CompanyData {
    company: string;
    country: string;
    vat: string;
    zip_code: string;
    city: string;
    address: string;
    state: string;
}

const initialCompanyData = {
    company: '',
    country: '',
    vat: '',
    zip_code: '',
    city: '',
    address: '',
    state: '',
};

const MainPage = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [companyData, setCompanyData] = useState<CompanyData>(initialCompanyData);

    const handleOpen = useCallback(() => setModalOpen(true), []);
    const handleClose = useCallback(() => setModalOpen(false), []);

    useEffect(() => {
        axios.get('http://localhost:1337/billing_info').then((res) => {
            const { countries, data } = res.data;
            setCountries(countries);
            setCompanyData(data);
        });
    }, []);

    return (
        <div className="main-page">
            <Button primary onClick={handleOpen}>
                Ввести данные
            </Button>
            <Modal onClose={handleClose} onOpen={handleOpen} open={isModalOpen} closeIcon>
                <Modal.Content>
                    <MainForm countries={countries} companyData={companyData} handleClose={handleClose} />
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default MainPage;
