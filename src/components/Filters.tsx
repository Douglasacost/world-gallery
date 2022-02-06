import React from 'react';
import { Grid } from '@mui/material';
import SelectFilter from './SelectFilter';
import { useCountriesContext } from '../context/CountriesContext';

export default function Filters() {
    const { continentsQl, loading, currencies, updateFilter } = useCountriesContext();

    const handleChangeContinent = (_: React.SyntheticEvent, value: unknown) => {
        updateFilter!('continent', value);
    }

    const handleChangeCurrency = (_: React.SyntheticEvent, value: unknown) => {
        updateFilter!('currency', value);
    }

    return (
        <Grid
            sx={{
                marginTop: '1rem',
                zIndex: 2,
                position: 'sticky',
                top: '-3px'
            }}
            item
        >
            <Grid
                sx={{
                    marginTop: '1rem',
                }}
                container
                justifyContent="flex-start"
                gap={2}
            >
                <Grid item>
                    <SelectFilter
                        loading={continentsQl.loading}
                        handleChange={handleChangeContinent}
                        items={continentsQl.data?.continents || []}
                        label=''
                        placeholder='Select continents to filter'
                    />
                </Grid>
                <Grid item>
                    <SelectFilter
                        loading={loading}
                        handleChange={handleChangeCurrency}
                        items={currencies || []}
                        label=''
                        placeholder='Select a currency to filter'
                    />
                </Grid>
            </Grid>
        </Grid>

    );
}
