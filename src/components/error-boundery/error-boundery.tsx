import './error-boundery.scss';
import React, { PropsWithChildren, cloneElement, memo } from 'react';

interface ErrorBounderyProps {
    errorText?: string;
}

const ErrorBoundery = memo(({ errorText, children }: PropsWithChildren<ErrorBounderyProps>) => {
    return (
        <div className="error-boundery">
            {console.log(children)}
            {children && cloneElement(children as React.ReactElement<any>, { error: Boolean(errorText) })}
            {errorText && <span className="error-boundery__text">{errorText}</span>}
        </div>
    );
});

export default ErrorBoundery;
