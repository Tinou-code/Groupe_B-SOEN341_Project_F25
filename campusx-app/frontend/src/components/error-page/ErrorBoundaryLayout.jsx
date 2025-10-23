//this component handles errors that may occur in the app
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { useState } from 'react';


export default function ErrorBoundaryLayout() {

    return(
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Outlet />
        </ErrorBoundary>
    )

}
