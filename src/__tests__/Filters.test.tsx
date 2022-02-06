import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Filters from '../components/Filters';
import { CountriesContext } from '../context/CountriesContext';
import { act } from 'react-dom/test-utils';
import { countriesContext } from '../tests-helpers/contexts';

type RSMock = {
    options: typeof countriesContext.continentsQl.data.continents;
    value: string;
    onChange: Function;
    placeholder: string;
};

jest.mock("react-select", () => ({ options, value, onChange, placeholder }: RSMock) => {
    function handleChange(event: unknown) {
        const option = options.find(
            option => option.code === (event as any).currentTarget.value
        );
        onChange([option]);
    }
    return (
        <select placeholder={placeholder} data-testid={placeholder} value={value} onChange={handleChange}>
            {options.map(({ name, code }) => (
                <option key={code} value={code}>
                    {name}
                </option>
            ))}
        </select>
    );
});

describe('Filters', () => {
    test('Filters load', () => {
        render(<CountriesContext.Provider value={countriesContext as any}>
            <Filters />
        </CountriesContext.Provider>);
        const continentSelect = screen.getByTestId('Select continents to filter');
        const currenciesSelect = screen.getByTestId('Select a currency to filter');
        expect(continentSelect).toBeInTheDocument();
        expect(currenciesSelect).toBeInTheDocument();
    });
    test('Selecting values', () => {
        render(<CountriesContext.Provider value={countriesContext as any}>
            <Filters />
        </CountriesContext.Provider>);
        const continentSelect = screen.getByTestId('Select continents to filter');
        const currenciesSelect = screen.getByTestId('Select a currency to filter');
        act(() => {
            fireEvent.change(continentSelect, { target: { value: 'AF' } });
        });
        expect(countriesContext.updateFilter).toHaveBeenCalledWith('continent', [{ code: 'AF', name: 'Africa' }]);
        act(() => {
            fireEvent.change(currenciesSelect, { target: { value: 'EUR' } });
        });
        expect(countriesContext.updateFilter).toHaveBeenCalledWith('currency', [{ code: 'EUR', name: 'Euro' }]);
    });
})
