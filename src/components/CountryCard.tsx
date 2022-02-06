import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Emoji from 'a11y-react-emoji';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Country } from '../context/CountriesContext';
import { Paper } from '@mui/material';
import { useModalContext } from '../context/ModalContext';

export default function CountryCard(props: Partial<Country> & { isDetailed?: boolean }) {
    const { toggleModal, setCurrentCountry } = useModalContext();

    const handleSeeDetails = () => {
        setCurrentCountry!(props.code!);
        toggleModal!();
    }

    return (
        <Paper sx={{ width: '100%', maxWidth: props.isDetailed ? 500 : 360, padding: '0.1rem' }}>
            <Box sx={{ my: 3, mx: 2 }}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography noWrap gutterBottom={!props.isDetailed} variant="h4" component="div">
                            {props.name}
                        </Typography>
                        {props.isDetailed && (
                            <Typography noWrap gutterBottom variant="h6" component="div">
                                ({props.native})
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                <Typography noWrap={!props.isDetailed} color="text.secondary" variant="body2">
                    Belongs to {props.continent?.name} continent, capital is {props.capital}
                    {props.isDetailed && (
                        `, their native language is ${props.languages![0].name} (${props.languages![0].code})`
                    )}
                </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
                <Stack direction="row" spacing={1}>
                    <Box>
                        <Typography gutterBottom variant="body1">
                            Flag
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Emoji label={props.continent?.name!} symbol={props.emoji!} />
                        </Stack>
                    </Box>
                    {props.currency && (
                        <>
                            <Divider orientation="vertical" flexItem />
                            <Box>
                                <Typography gutterBottom variant="body1">
                                    Currency
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    {props.currency?.split(',').map(currency => (
                                        <Chip size='small' key={currency + props.code} label={currency} />
                                    ))}
                                </Stack>
                            </Box>
                        </>
                    )}
                    {props.languages && (
                        <>
                            <Divider orientation="vertical" flexItem />
                            <Box>
                                <Typography gutterBottom variant="body1">
                                    Language
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    {props.languages.map(language => (
                                        <Chip key={language.code + props.code!} size='small' label={language.code} />
                                    ))}
                                </Stack>
                            </Box>
                        </>
                    )}
                    {props.phone && (
                        <>
                            <Divider orientation="vertical" flexItem />
                            <Box>
                                <Typography gutterBottom variant="body1">
                                    Phone
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    {props.phone}
                                </Stack>
                            </Box>
                        </>
                    )}

                </Stack>

            </Box>
            {props.isDetailed && (
                <>
                    <Divider variant="middle" />
                    <Box sx={{ m: 2 }}>
                        <Stack direction="row" spacing={1}>
                            <Box>
                                <Typography gutterBottom variant="body1">
                                    States/Provinces
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                }}>
                                    {props.states?.length ? props.states?.map(state => (
                                        <Chip key={state.code + props.code! + state.name} size='small' label={state.name} />
                                    )) : (
                                        <Typography noWrap={!props.isDetailed} color="text.secondary" variant="body2">
                                            No states/provinces info yet
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Stack>

                    </Box>
                </>
            )}
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                {props.isDetailed ? (
                    <Button onClick={toggleModal}>Close</Button>
                ) : (
                    <Button onClick={handleSeeDetails}>See details</Button>
                )}

            </Box>
        </Paper>
    );
}
