import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ModalProvider } from './context/ModalContext';
import { CountriesProvider } from './context/CountriesContext';
import Main from './views/Main';
import './App.css';

const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache()
});

function App({ isTest }: { isTest: boolean }) {
  return (
    <ApolloProvider client={client}>
      <CountriesProvider>
        <ModalProvider>
          <Main isTest={isTest} />
        </ModalProvider>
      </CountriesProvider>
    </ApolloProvider> 
  );
}

export default App;
