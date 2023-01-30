import Head from 'next/head';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { DashboardLayout } from '../components/dashboard-layout';
import {
    Box,
    Paper,
    Container,
    Tabs,
    Tab,
    AppBar,
    Fab,
    Tooltip,
    Toolbar,
    Chip,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Divider,
    LinearProgress,
    CircularProgress
} from '@mui/material';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { QuerySetup } from '../components/datawrangling/querysetup';
import { PdfSetup } from '../components/datawrangling/pdfsetup';
import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { maxWidth } from '@mui/system';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box component="div"
                    display='flex'
                    minHeight="400px"
                    flexDirection="column"
                    sx={{
                        paddingTop: 3,
                        overflow: "auto"
                    }}
                    maxHeight="600px">
                    {children}
                </Box>
            )}

        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

const Page = () => {
    const [currentquery, setQuery] = useState("");
    const [queryArray, setQueryArray] = useState([]);
    const [url, setUrl] = useState("");
    const [fileName, setFileName] = useState("No File is Picked");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [disableResult, setDisableResult] = useState(true);
    const [progress, setProgress] = useState(100);
    const [tabValue, setTabValue] = useState(0)
    const [queryErrorMessage, setQueryErrorMessage] = useState("");
    const [urlErrorMessage, setUrlErrorMessage] = useState("");
    const [pdf, setPdf] = useState();
    const [extracedText, setExtractedText] = useState([]);
    const [orderedResults, setOrderedResults] = useState({})

    // useEffect(()=>{
    //     if (true){

    //     }
    // })
    const handleBlurQuery = () => {
        if (queryArray < 1) {
            setQueryErrorMessage("Provide one or more queries.");
        } else {
            setQueryErrorMessage("");
        }
    }
    const handleBlurURL = () => {
        if (url.length < 1) {
            setUrlErrorMessage("Provide a website URL");
        } else {
            setUrlErrorMessage("");
        }
    }
    const handleFileInput = (event) => {
        setPdf(event.target.files[0]);
        setFileName(event.target.files[0].name);
        setIsFilePicked(true);
    }
    const addQuery = () => {
        if (!currentquery.trim() == "") {
            setQueryArray([...new Set([currentquery, ...queryArray])]);
            setQueryErrorMessage("");
        }
    }
    const removeQuery = (text) => {
        const ind = queryArray.indexOf(text)
        if (ind !== -1) {
            if (queryArray.length == 1) {
                setQueryErrorMessage("Provide one or more queries.");
            }
            setQueryArray([...queryArray.filter(e => e !== text)])

        }

    }
    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    }
    const handleSubmit = async (event) => {
        // change the tab to results tab
        event.preventDefault();
        try {
            const body_ = JSON.stringify(
                {
                    "queries": [...queryArray],
                    "url": url
                }
            )
            setTabValue(2)
            setDisableResult(false)
            if (tabValue == 0) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data_wrangling/web_scrape`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Origin': `${process.env.NEXT_PUBLIC_API_URL}`
                        },
                        body: body_
                    }
                )
            } else if (tabValue == 1) {
                const body_ = JSON.stringify(
                    {
                        "queries": [...queryArray],
                        "file": pdf
                    }
                )
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/data_wrangling/pdf_scrape`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Origin': `${process.env.NEXT_PUBLIC_API_URL}`
                        },
                        body: body_
                    }
                );

            }



        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <Head>
                <title>
                    Data Wrangling
                </title>
            </Head>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    paddingTop: '80px'
                }}
            >
                <Paper elevation={6}
                    sx={{
                        m: '20px',
                        p: '20px',
                        minWidth: '1000px'
                    }}
                >
                    <Tabs
                        variant="fullWidth"
                        indicatorColor='primary'
                        value={tabValue}
                        centered
                        onChange={handleTabChange}
                        sx={{ borderRight: 1, borderColor: 'divider', paddingTop: "10px" }}>
                        <Tab label="Web Scraping" />
                        <Tab label="PDF Scraping" />
                        <Tab name="results" label="Results" disabled={disableResult} />
                    </Tabs>
                    <form onSubmit={handleSubmit} target='results' method='POST' action={`${process.env.NEXT_PUBLIC_API_URL}/data_wrangling/web_scrape`}>
                        <TabPanel value={tabValue} index={0}>
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
                                    label="Query"
                                    name="Query"
                                    fullWidth
                                    margin="normal"
                                    error={queryErrorMessage.length > 1}
                                    helperText={queryErrorMessage}
                                    onBlur={handleBlurQuery}
                                    onChange={event => { setQuery(event.target.value) }}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <IconButton
                                                    onClick={() => {
                                                        addQuery(currentquery)
                                                    }}
                                                    color="primary"
                                                >
                                                    <AddBoxIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                >
                                </TextField>

                                <Box>
                                    {queryArray.map((query) => (
                                        <Chip
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

                                    ))}
                                </Box>
                                <TextField
                                    fullWidth
                                    label="URL"
                                    margin="normal"
                                    name="URL"
                                    value={url}
                                    onChange={event => { setUrl(event.target.value.trim()) }}
                                    onBlur={handleBlurURL}
                                    variant="outlined"
                                    error={urlErrorMessage.length > 0}
                                    helperText={urlErrorMessage}
                                    required
                                />
                                <Box>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        // onClick={handleSubmit}
                                        disabled={queryArray.length < 1 || url.length < 1}
                                        type="submit"
                                        sx={{
                                            ':hover': {
                                                bgcolor: 'secondary.main', // theme.palette.primary.main
                                            },
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Box>

                            </Box>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
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
                                <Box>
                                    <Box>
                                        <TextField
                                            label="Query"
                                            name="Query"
                                            fullWidth
                                            margin="normal"
                                            error={queryErrorMessage.length > 1}
                                            helperText={queryErrorMessage}
                                            onBlur={handleBlurQuery}
                                            onChange={event => { setQuery(event.target.value) }}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='start'>
                                                        <IconButton
                                                            color='primary'
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
                                    </Box>
                                    {queryArray.map((query) => (
                                        <Box
                                            component="div"
                                            sx={{
                                                display: 'inline',
                                            }} >
                                            <Chip
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
                                    <Box display="flex" justifyContent='space-between' alignItems='center' paddingY='20px' paddingX='10px'>
                                        <Box width='90%' display="flex" flexDirection="row" alignItems='center'>
                                            <Box display="flex" width='20%' alignItems='center' margin='10px' flexWrap="wrap" justifyContent='space-between'>

                                                <Typography variant='subtitle2' noWrap  >
                                                    {fileName}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography variant='subtitle2'>
                                                    {(isFilePicked) ? (pdf.size / 1024).toFixed(2) : 0} MB
                                                </Typography>
                                            </Box>

                                            {/* <Box width='80%' margin='10px'>
                                                    <LinearProgress variant='determinate' value={progress} color={(progress >= 100) ? "success" : "secondary"}></LinearProgress>
                                                </Box> */}
                                        </Box>


                                        <Tooltip title="Upload PDF">
                                            <Fab component="label" variant='contained' color='primary'
                                                sx={{
                                                    ':hover': {
                                                        bgcolor: 'secondary.main', // theme.palette.primary.main
                                                    },
                                                }}
                                            >
                                                <input required hidden accept='application/pdf' type="file" onChange={handleFileInput} />
                                                <UploadFileIcon />
                                            </Fab>

                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        // onClick={handleSubmit}
                                        disabled={queryArray.length < 1 || !isFilePicked}
                                        type="submit"
                                        sx={{
                                            ':hover': {
                                                bgcolor: 'secondary.main', // theme.palette.primary.main
                                            },
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <Box sx={{ my: 3 }}>
                                <Typography variant='h5'>
                                    Results
                                </Typography>
                            </Box>
                        </TabPanel>
                    </form>
                </Paper>
            </Box>
        </>
    )

}
Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;