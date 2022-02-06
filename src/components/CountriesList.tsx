import React from 'react';
import { Backdrop, CircularProgress, Grid, Typography } from '@mui/material';
import { useCountriesContext } from '../context/CountriesContext';
import CountryCard from './CountryCard';

export default function CountriesList() {
    const { countries, loading } = useCountriesContext();
    return (
        <Grid
            sx={{
                marginTop: '1rem',
            }}
            container
            spacing={2}
        >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {countries?.map(country => (
                <Grid key={country.code} item xs={6} md={4}>
                    <CountryCard {...country} />
                </Grid>
            ))}
            {!countries?.length && !loading && (
                <Typography gutterBottom variant="h2" component="div">
                    There is no result from your search :(
                </Typography>
            )}
        </Grid>
    );
}
