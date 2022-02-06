import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { countriesContext } from '../tests-helpers/contexts';
import { CountriesContext } from '../context/CountriesContext';
import ButtonAppBar from '../components/ButtonAppBar';

describe('AppBar', () => {
  test('renders the AppBar component', async () => {
    render(
      <CountriesContext.Provider value={countriesContext as any}>
        <ButtonAppBar />
      </CountriesContext.Provider>
    );
    const linkElement = screen.getByText(/World Gallery/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Send search query', async () => {
    render(
      <CountriesContext.Provider value={countriesContext as any}>
        <ButtonAppBar />
      </CountriesContext.Provider>
    );
    const searchInput = await screen.getByTestId('search-input');
    searchInput.addEventListener('keyup', countriesContext.setSearchQuery);
    fireEvent(searchInput, new KeyboardEvent('keyup', { key: 'B' }));
    await waitFor(() => { expect(countriesContext.setSearchQuery).toBeCalled() });
    expect(searchInput).toBeInTheDocument();

  });
}); 
