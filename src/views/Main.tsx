import React from 'react';
import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import ButtonAppBar from '../components/ButtonAppBar';
import CountriesList from '../components/CountriesList';
import Filters from '../components/Filters';
import ModalSupervisor from '../supervisors/ModalSupervisor';

function Main({ isTest }: { isTest?: boolean }) {
  const matches = useMediaQuery('(min-width:800px)');

  if (!matches && !isTest) {
    return (
      <Container>
        <Grid
          container
          justifyContent="middle"
          justifyItems="center"
          alignItems="center"
          sx={{
            height: '100vh',
          }}
        >
          <Typography variant="h4" component="div">
            This website is only available on desktop
          </Typography>
        </Grid>
      </Container>
    )
  }

  return (
    <>
      <ButtonAppBar />
      <Container fixed>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Filters />
          <Grid item >
            <CountriesList />
          </Grid>
        </Grid>
      </Container>
      <ModalSupervisor />
    </>
  );
}

export default Main;
