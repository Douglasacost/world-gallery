import { gql, useLazyQuery } from "@apollo/client";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { Country } from "./CountriesContext";

interface IModalContext {
    open: boolean;
    currentCountry: string;
    countryDetails?: Country;
    loading?: boolean;
    toggleModal?: () => void;
    setOpen?: (x: boolean) => void;
    setCurrentCountry?: (country: string) => void;
}

const defaultState = {
    open: false,
    currentCountry: ""
};

const COUNTRY = gql`
    query Country($country: ID!) {
        country(code: $country) {
        name
        code
        currency
            native
        emoji
        emojiU
            languages {
            name
            code
        }
        states {
            code
            name
        }
        phone
        capital
        continent {
            name
        }
        }
    }
`;

export const ModalContext = createContext<IModalContext>(defaultState);

export const ModalProvider: FC = ({ children }) => {
    const [fetchCountry, { loading, error, data }] = useLazyQuery(COUNTRY);
    const [open, setOpen] = useState(defaultState.open);
    const [currentCountry, setCurrentCountry] = useState(defaultState.currentCountry);

    useEffect(() => {
        if(currentCountry) {
            fetchCountry({ variables: { country: currentCountry } });
        }
    }, [currentCountry]);

    const toggleModal = () => {
        setOpen(!open);
    };

    return (
        <ModalContext.Provider
            value={{
                open,
                currentCountry,
                toggleModal,
                setCurrentCountry,
                loading,
                countryDetails: data?.country,
                setOpen
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }
    return context;
}