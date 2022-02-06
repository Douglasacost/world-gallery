import React from 'react';
import { render, screen } from '@testing-library/react';
import { countriesContext } from '../tests-helpers/contexts';
import { CountriesContext } from '../context/CountriesContext';
import CountriesList from '../components/CountriesList';

const country = {
    name: 'Afghanistan',
    code: 'AF',
}

describe('App', () => {
    test('renders the CountriesList component', async () => {
        render(
            <CountriesContext.Provider value={countriesContext as any}>
                <CountriesList />
            </CountriesContext.Provider>
        );
        const linkElement = screen.getByText(/There is no result from your search/i);
        expect(linkElement).toBeInTheDocument();
    });
    test('Loading the CountriesList component', async () => {
        render(
            <CountriesContext.Provider value={{...countriesContext, countries: [country]} as any}>
                <CountriesList />
            </CountriesContext.Provider>
        );
        const linkElement = screen.getByText(/Afghanistan/i);
        expect(linkElement).toBeInTheDocument();
    });
}); 
