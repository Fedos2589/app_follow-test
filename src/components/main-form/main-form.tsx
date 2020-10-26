import './main-form.scss';
import React, { useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import { Country, CompanyData } from '../../containers/main-page/main-page';
import Input from '../input/input';
import ErrorBoundery from '../error-boundery/error-boundery';
import Dropdown from '../dropdown/dropdown';
import TextArea from '../textarea/textarea';
import { Grid, Button } from 'semantic-ui-react';
import { getCountryCode } from '../../helpers/getCountryCode';
import { checkVAT, countries as vatCountries } from 'jsvat';
import { Errors, hasErrors } from '../../helpers/hasErrors';
import { isInEu, checkMinLength, checkNameFormat } from '../../helpers/validators';
import errorsText from '../consts/errors';

interface MainFormProps {
    countries: Country[];
    companyData: CompanyData;
    handleClose(): void;
}

const MainForm = ({
    countries,
    companyData: {
        company = '',
        country: defaultCountry = '',
        vat = '',
        zip_code = '',
        address: defaultAddress = '',
        state = '',
    },
    handleClose,
}: MainFormProps) => {
    const [country, setCountry] = useState<string>(defaultCountry);
    const [states, setStates] = useState<string[]>([]);
    const [selectedState, setSelectedState] = useState<string>(state);
    const [name, setName] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>(company);
    const [vatId, setVatId] = useState<string>(vat);
    const [zipCode, setZipCode] = useState<string>(zip_code);
    const [address, setAddress] = useState<string>(defaultAddress);
    const [errors, setErrors] = useState<Errors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const countryIsInEu = useMemo(() => country && isInEu(country), [country]);

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
            setErrors({ ...errors, country: '' });
        },
        [countries, errors],
    );

    const handleStateChange = useCallback(
        (e, data) => {
            setSelectedState(data.value);
            setErrors({ ...errors, state: '' });
        },
        [errors],
    );

    const handleNameChange = useCallback(
        (e, data) => {
            setName(data.value);
            setErrors({ ...errors, name: '' });
        },
        [errors],
    );

    const handleCompanyNameChange = useCallback(
        (e, data) => {
            setCompanyName(data.value);
            setErrors({ ...errors, companyName: '' });
        },
        [errors],
    );

    const handleVatIdChange = useCallback(
        (e, data) => {
            setVatId(data.value);
            setErrors({ ...errors, vatId: '' });
        },
        [errors],
    );

    const handleZipCodeChange = useCallback(
        (e, data) => {
            setZipCode(data.value);
            setErrors({ ...errors, zipCode: '' });
        },
        [errors],
    );

    const handleAddressChange = useCallback(
        (e, data) => {
            setAddress(data.value);
            setErrors({ ...errors, address: '' });
        },
        [errors],
    );

    const handleNameBlur = useCallback(() => {
        const words = name.split(' ');

        if (!checkMinLength(words, 2) || !words.every((word) => checkNameFormat(word) && checkMinLength(word, 2))) {
            setErrors({ ...errors, name: errorsText.name });
        }
    }, [errors, name]);

    const handleCompanyNameBlur = useCallback(() => {
        if (!checkMinLength(companyName, 3)) {
            setErrors({ ...errors, companyName: errorsText.company });
        }
    }, [companyName, errors]);

    const handleZipCodeBlur = useCallback(() => {
        if (!checkMinLength(zipCode, 3)) {
            setErrors({ ...errors, zipCode: errorsText.zipCode });
        }
    }, [errors, zipCode]);

    const handleAddressBlur = useCallback(() => {
        if (!checkMinLength(address, 7)) {
            setErrors({ ...errors, address: errorsText.address });
        }
    }, [address, errors]);

    const handleVatIdBlur = useCallback(() => {
        const countryOfVat = checkVAT(vatId, vatCountries).country;

        if (!countryOfVat || countryOfVat.isoCode.short !== getCountryCode(country)) {
            return setErrors({ ...errors, address: errorsText.address });
        }
    }, [country, errors, vatId]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!name) {
                return setErrors({ ...errors, name: errorsText.name });
            }
            if (!companyName) {
                return setErrors({ ...errors, companyName: errorsText.company });
            }
            if (!country) {
                return setErrors({ ...errors, country: errorsText.country });
            }
            if (countryIsInEu && !vatId) {
                return setErrors({ ...errors, vatId: errorsText.vatId });
            }
            if (states.length > 0 && !state) {
                return setErrors({ ...errors, state: errorsText.state });
            }
            if (!zipCode) {
                return setErrors({ ...errors, zipCode: errorsText.zipCode });
            }
            if (!address) {
                return setErrors({ ...errors, address: errorsText.address });
            }
            if (!hasErrors(errors)) {
                setIsLoading(true);
                axios
                    .post('http://localhost:1337/save', {
                        name,
                        company: companyName,
                        country,
                        address,
                        state: selectedState,
                        vat: vatId,
                        zip_code: zipCode,
                    })
                    .then((res) => {
                        setIsLoading(false);
                        handleClose();
                    })
                    .catch((err) => setIsLoading(false));
            }
        },
        [
            address,
            companyName,
            country,
            countryIsInEu,
            errors,
            handleClose,
            name,
            selectedState,
            state,
            states.length,
            vatId,
            zipCode,
        ],
    );

    return (
        <div className="main-form">
            <h2 className="main-form__title">Billing Details</h2>
            <form onSubmit={handleSubmit}>
                <Grid columns="equal">
                    <Grid.Row>
                        <Grid.Column>
                            <ErrorBoundery errorText={errors.name}>
                                <Input
                                    label="Customer full name"
                                    placeholder={'e.g. John Smith'}
                                    value={name}
                                    onChange={handleNameChange}
                                    onBlur={handleNameBlur}
                                />
                            </ErrorBoundery>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ErrorBoundery errorText={errors.companyName}>
                                <Input
                                    label="Company name"
                                    placeholder="e.g. AppFollow"
                                    value={companyName}
                                    onChange={handleCompanyNameChange}
                                    onBlur={handleCompanyNameBlur}
                                />
                            </ErrorBoundery>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={countryIsInEu ? 10 : 16}>
                            <ErrorBoundery errorText={errors.country}>
                                <Dropdown
                                    label="Country"
                                    placeholder="Select country"
                                    options={countryOptions}
                                    value={country}
                                    onChange={handleCountryChange}
                                />
                            </ErrorBoundery>
                        </Grid.Column>
                        {countryIsInEu && (
                            <Grid.Column>
                                <ErrorBoundery errorText={errors.vatId}>
                                    <Input
                                        label="VAT ID"
                                        placeholder="e.g. 999999999"
                                        value={vatId}
                                        onChange={handleVatIdChange}
                                        onBlur={handleVatIdBlur}
                                    />
                                </ErrorBoundery>
                            </Grid.Column>
                        )}
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <ErrorBoundery errorText={errors.state}>
                                <Dropdown
                                    label="State"
                                    placeholder="Select state"
                                    options={stateOptions}
                                    disabled={stateOptions.length < 1}
                                    value={selectedState}
                                    onChange={handleStateChange}
                                />
                            </ErrorBoundery>
                        </Grid.Column>
                        <Grid.Column>
                            <ErrorBoundery errorText={errors.zipCode}>
                                <Input
                                    label="Zip Code"
                                    placeholder="e.g. 55111"
                                    value={zipCode}
                                    onChange={handleZipCodeChange}
                                    onBlur={handleZipCodeBlur}
                                />
                            </ErrorBoundery>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ErrorBoundery errorText={errors.address}>
                                <TextArea
                                    label="Address"
                                    placeholder="e.g. 2450 Iroquois Ave."
                                    value={address}
                                    onChange={handleAddressChange}
                                    onBlur={handleAddressBlur}
                                />
                            </ErrorBoundery>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button primary type="submit" disabled={hasErrors(errors) || isLoading}>
                                Ввести данные
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </form>
        </div>
    );
};

export default MainForm;
