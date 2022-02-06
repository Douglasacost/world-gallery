import { gql, OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { createContext, FC, useContext, useEffect, useState } from "react";
import useFilters, { Filter } from "./helpers/useFilters";

interface ICountriesContext {
    countries: Partial<Country>[];
    loading: boolean;
    error: unknown;
    searchQuery: string;
    continentsQl: QueryResult<{
        continents: Continent[];
    }, OperationVariables>;
    currencies: Currency[];
    setSearchQuery?: (x: string) => void;
    updateFilter?: (filterType: keyof Filter, value: any) => void;
}

type Language = {
    code: string
    name: string
    native: string
    rtl: boolean
}

export type Continent = {
    code: string
    name: string
    countries: Country[]
}

export type Currency = {
    code: string
    name: string
}

type State = {
    code: string
    name: string
    country: Country
}

export type Country = {
    code: string
    name: string
    native: string
    phone: string
    continent: Continent
    capital: string
    currency: string
    languages: Language[]
    emoji: string
    emojiU: string
    states: State[]
}

const defaultState = {
    countries: [] as Partial<Country>[],
    continentsQl: {
        continents: [] as Partial<Continent>[],
        loading: false,
    } as any,
    currencies: [] as Currency[],
    searchQuery: '',
    loading: false,
    error: false,
};

const LIST_COUNTRIES = gql`
  query CountriesList($countryFilterInput: CountryFilterInput) {
    countries(filter: $countryFilterInput) {
      name
      code
      currency
      emoji
      emojiU
      capital
      continent {
          name
      }
    }
  }
`;

const LIST_CONTINENTS = gql`
  {
    continents {
      name
      code
    }
  }
`;

export const CountriesContext = createContext<ICountriesContext>(defaultState);

export const CountriesProvider: FC = ({ children }) => {
    const { models, operations } = useFilters();
    const countriesQl = useQuery<{ countries: Country[] }>(LIST_COUNTRIES);
    const continentsQl = useQuery<{ continents: Continent[] }>(LIST_CONTINENTS);
    const [countries, setCountries] = useState(defaultState.countries);
    const [currencies, setCurrencies] = useState(defaultState.currencies);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (countriesQl.data?.countries) {
            const result = countriesQl.data.countries.filter(function (o) {
                return o.name.toLowerCase().includes(searchQuery.toLowerCase());
            })
            setCountries(result);
        }
    }, [searchQuery])

    useEffect(() => {
        setCountries(countriesQl.data?.countries!);
        if (!currencies?.length) {
            setCurrencies(
                countriesQl.data?.countries!
                    .map(x => ({ code: x.currency, name: x.currency }))
                    .filter((x) => x.code)!
                );
        }
    }, [countriesQl.data?.countries]);

    useEffect(() => {
        countriesQl.refetch({
            countryFilterInput: JSON.parse(JSON.stringify(models.filters))
        });
    }, [models.filters]);

    return (
        <CountriesContext.Provider
            value={{
                countries,
                currencies,
                loading: countriesQl.loading,
                error: false,
                searchQuery,
                setSearchQuery,
                continentsQl: continentsQl,
                updateFilter: operations.updateFilter,
            }}
        >
            {children}
        </CountriesContext.Provider>
    );
};

export const useCountriesContext = () => {
    const context = useContext(CountriesContext);
    if (context === undefined) {
        throw new Error("useCountriesContext must be used within a CountriesProvider");
    }
    return context;
}