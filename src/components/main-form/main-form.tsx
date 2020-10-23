import './main-form.scss';
import React, { useMemo, useState, useCallback } from 'react';
import { Country, CompanyData } from '../../containers/main-page/main-page';
import Input from '../input/input';
import ErrorBoundery from '../error-boundery/error-boundery';
import Dropdown from '../dropdown/dropdown';
import TextArea from '../textarea/textarea';
import { Grid } from 'semantic-ui-react';

interface MainFormProps {
    countries: Country[];
    companyData: CompanyData;
}

const MainForm = ({ countries, companyData }: MainFormProps) => {
    const [country, setCountry] = useState<string>('');
    const [states, setStates] = useState<string[]>([]);
    const [selectedState, setSelectedState] = useState<string>('');

    const countryOptions = useMemo(
        () =>
            countries.map(({ country }) => ({
                key: country,
                text: country,
                value: country,
            })),
        [countries],
    );

    const stateOptions = useMemo(
        () =>
            states.map((state) => ({
                key: state,
                text: state,
                value: state,
            })),
        [states],
    );

    const handleCountryChange = useCallback(
        (e, data) => {
            const selectedCountry = countries.find(({ country }) => country === data.value);

            setCountry(selectedCountry?.country || '');
            setStates(selectedCountry?.states || []);
        },
        [countries],
    );

    const handleStateChange = useCallback((value) => setSelectedState(value), []);

    return (
        <div className="main-form">
            <h2 className="main-form__title">Billing Details</h2>
            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column>
                        <ErrorBoundery>
                            <Input label="Customer full name" placeholder="e.g. John Smith" />
                        </ErrorBoundery>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <ErrorBoundery>
                            <Input label="Company name" placeholder="e.g. AppFollow" />
                        </ErrorBoundery>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <ErrorBoundery>
                            <Dropdown
                                label="Country"
                                placeholder="Select country"
                                options={countryOptions}
                                onChange={handleCountryChange}
                            />
                        </ErrorBoundery>
                    </Grid.Column>
                    <Grid.Column>
                        <ErrorBoundery>
                            <Input label="VAT ID" placeholder="e.g. 999999999" />
                        </ErrorBoundery>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <ErrorBoundery>
                            <Dropdown
                                label="State"
                                placeholder="Select state"
                                options={stateOptions}
                                disabled={stateOptions.length < 1}
                                onChange={handleStateChange}
                            />
                        </ErrorBoundery>
                    </Grid.Column>
                    <Grid.Column>
                        <ErrorBoundery>
                            <Input label="Zip Code" placeholder="e.g. 55111" />
                        </ErrorBoundery>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <ErrorBoundery>
                            <TextArea label="Address" placeholder="e.g. 2450 Iroquois Ave." />
                        </ErrorBoundery>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default MainForm;
