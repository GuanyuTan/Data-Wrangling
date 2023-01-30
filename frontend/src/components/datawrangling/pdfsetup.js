import {
    Box,
    Button,
    TextField,
    Chip,
    InputAdornment,
    IconButton,
    Container,
    Typography,
    Tooltip,
    Grid,
    Fab
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';

const acceptFile = (event) => {

}

export const PdfSetup = (props) => {
    const [fileName, setFileName] = useState('No File is Picked');
    const [selectedFile, setSelectedFile] = useState();
    const [currentquery, setQuery] = useState('');
    const [queryArray, setQueryArray] = useState([]);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const addQuery = () => {
        if (!currentquery.trim() == "") {
            setQueryArray([...new Set([currentquery, ...queryArray])]);
        }
    }

    const removeQuery = (text) => {
        const ind = queryArray.indexOf(text);
        if (ind !== -1) {
            setQueryArray([...queryArray.filter(e => e !== text)]);
        }
    }

    const handleFileInput = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }
    return (
        <>
            <Box display='flex' flexDirection='column'>
                <Box sx={{ my: 3, }}>
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
                        Provide Query/ies and Upload a Pdf File to Scrape
                    </Typography>
                </Box>
                <Box sx={{ my: 3 }} >
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
                                            addQuery();
                                        }}
                                    >
                                        <AddBoxIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    >
                    </TextField>

                    {queryArray.map((query) => (
                        <Box
                            component="div"
                            sx={{
                                display: 'inline',
                            }} >
                            <Chip
                                key={query}
                                label={query}
                                variant="filled"
                                sx={{
                                    m: '2px',
                                    p: '2px',
                                }}
                                onDelete={() => {
                                    removeQuery(query)
                                }}
                            >

                            </Chip>
                        </Box>

                    ))}
                    <Box display="flex" marginTop="auto" marginLeft="auto" textAlign="center">
                        <Typography variant='subtitle2'  >
                            {fileName}
                        </Typography>
                        <Tooltip marginTop="auto" title="Upload PDF">
                            <Fab component="label" variant='contained' >
                                <input hidden accept='application/pdf' type="file" onChange={handleFileInput} />
                                <UploadFileIcon />
                            </Fab>
                        </Tooltip>
                    </Box>

                </Box>
            </Box>
        </>
    )
}