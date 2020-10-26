export interface Errors {
    [key: string]: string;
}

export const hasErrors = (errors: Errors) => Object.values(errors).some((error) => error.length > 0);
