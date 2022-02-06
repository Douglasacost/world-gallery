export const countriesContext = {
    continentsQl: {
        loading: false,
        data: {
            continents: [
                {
                    code: 'AF',
                    name: 'Africa'
                },
                {
                    code: 'AS',
                    name: 'Asia'
                }]
        }
    },
    currencies: [
        {
            code: 'USD',
            name: 'US Dollar'
        },
        {
            code: 'EUR',
            name: 'Euro'
        }],
    updateFilter: jest.fn(),
    setSearchQuery: jest.fn(),
    loading: false,
}

export const modalContext = {
    open: false,
    setOpen: jest.fn(),
    loading: false,
    currentCountry: ""
}