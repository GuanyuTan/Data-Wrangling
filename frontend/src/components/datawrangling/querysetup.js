import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Chip,
    Typography,
    InputAdornment,
    IconButton
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';


export const QuerySetup = (props) => {
    const [currentquery, setQuery] = useState('');
    const [queryArray, setQueryArray] = useState([]);
    const [url, setUrl] = useState('');
    const addQuery = () => {
        if (!currentquery.trim() == "") {
            setQueryArray([...new Set([currentquery, ...queryArray])]);
        }
    }

    const removeQuery = (text) => {
        const ind = queryArray.indexOf(text)
        if (ind !== -1) {
            setQueryArray([...queryArray.filter(e => e !== text)])
        }
    }

    return (
        <>
            <Box sx={{ my: 3 }}>
                <Typography
                    color={"textPrimary"}
                    variant="h4"
                >
                    Setup
                </Typography>
                <Typography
                    color={"textSecondary"}
                    variant="body2"
                    gutterBottom
                >
                    Provide Query/ies and Website URL to Scrape
                </Typography>
            </Box>

            <Box display='flex' flexDirection='column'>
                <TextField
                    error={Boolean(queryArray.length < 1)}
                    fullWidth
                    helperText={queryArray.length < 1 ? "Please enter at least one query" : ""}
                    label="Query"
                    margin="normal"
                    name="Query"
                    onChange={event => { setQuery(event.target.value) }}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='start'>
                                <IconButton
                                    onClick={() => {
                                       dispatch(addQuery(query))
                                    }}
                                >
                                    <AddBoxIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                >
                </TextField>

                <Box>
                    {queryArr.map((query) => (
                        <Chip
                            key={query}
                            label={query}
                            variant="filled"
                            sx={{
                                m: '2px',
                                p: '2px',
                            }}
                            onDelete={() => {
                                dispatch(removeQuery(query))
                            }}
                        >

                        </Chip>

                    ))}
                </Box>
                <TextField
                    fullWidth
                    label="URL"
                    margin="normal"
                    name="URL"
                    onChange={event => { setUrl(event.target.value) }}
                    variant="outlined"
                    error={Boolean(url == '')}
                    helperText={url == '' ? "Please enter a website url" : ""}
                    required
                />
                <Box>
                    <Button fullWidth color="primary" variant="contained" >Submit</Button>
                </Box>

            </Box>
        </>

    );
};
