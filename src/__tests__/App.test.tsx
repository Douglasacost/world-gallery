import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from '../views/Main';
import { countriesContext, modalContext } from '../tests-helpers/contexts';
import { CountriesContext } from '../context/CountriesContext';
import { ModalContext } from '../context/ModalContext';

describe('App', () => {
  test('renders the App component', async () => {
    render(
      <ModalContext.Provider value={modalContext as any}>
        <CountriesContext.Provider value={countriesContext as any}>
          <Main isTest />
        </CountriesContext.Provider>
      </ModalContext.Provider>
    );
    const linkElement = screen.getByText(/World Gallery/i);
    expect(linkElement).toBeInTheDocument();
  });
}); 
