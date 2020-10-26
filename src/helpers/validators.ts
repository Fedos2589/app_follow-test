import { isEuMember } from 'is-eu-member';
import { getCountryCode } from './getCountryCode';

export const checkMinLength = (value: string | string[], min: number) => value.length >= min;

export const checkNameFormat = (value: string) => /^[a-zA-Z-' ]+$/.test(value);

export const checkEntry = (value: string, arr: string[]) => arr.includes(value);

export const isInEu = (country: string) => isEuMember(getCountryCode(country));
