import Head from 'next/head';
import PropTypes from 'prop-types';
import { Answer } from '../components/datawrangling/answers'
import { DashboardLayout } from '../components/dashboard-layout';
import {
    Box,
    Paper,
    Tabs,
    Tab,
    Fab,
    Tooltip,
    Chip,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Divider,
    CircularProgress,
    useTheme
} from '@mui/material';
import { useRef, useState } from 'react';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SwipeableViews from 'react-swipeable-views';
import Router from 'next/router';
import axios from 'axios';



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
    const fileRef = useRef();
    const queryRef = useRef();
    const [loading, setLoading] = useState(false);
    const [currentquery, setQuery] = useState("");
    const [doc, setDoc] = useState("");
    const [queryArray, setQueryArray] = useState([]);
    const [result, setResult] = useState()
    const [url, setUrl] = useState("");
    const [fileName, setFileName] = useState("No File is Picked");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [disableResult, setDisableResult] = useState(true);
    const [tabValue, setTabValue] = useState(0)
    const [queryErrorMessage, setQueryErrorMessage] = useState("");
    const [urlErrorMessage, setUrlErrorMessage] = useState("");
    const [pdf, setPdf] = useState();

    const theme = useTheme();


    const sendProps = () => {
        // console.log(result.document)
        // console.log(queryArray)
        // console.log(JSON.stringify(result.documents))
        Router.push(
            {
                pathname: "/wrangling/retrain",
                query: {
                    document_: JSON.stringify(result.documents),
                    queryArray: [...queryArray]
                }
            }
        )
    }

    const removeFile = () => {
        fileRef.current.value = null;
        setPdf(null)
        setFileName("No File is Picked")
        setIsFilePicked(false)
    }
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
    const handleFileInput = () => {
        const file = fileRef.current.files[0]
        setPdf(file);
        setFileName(file.name);
        setIsFilePicked(Boolean(file));
    }
    const addQuery = () => {
        if (!queryRef.current.value.trim() == "") {
            setQueryArray([...new Set([queryRef.current.value, ...queryArray])]);
            setQueryErrorMessage("");
            queryRef.current.value = "";
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
            setLoading(true)
            setDisableResult(false)
            if (tabValue == 0) {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wrangling/web_scrape`,
                    {

                        'queries': [...queryArray],
                        'url': url

                    }
                ).then((result) => {
                    setResult(result.data);
                    setDoc(result.data.documents);
                    setLoading(false);
                    setTabValue(2);
                }).catch(error => {
                    console.log(error)
                })
            } else if (tabValue == 1) {
                const body_ = new FormData();
                // for(var i=0; i<queryArray.length; i++){
                //     body.append('queries[]', queryArray[i]);
                // }
                queryArray.forEach(item => {
                    body_.append("queries", item)
                })
                body_.append("files", pdf);

                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wrangling/pdf_scrape`,
                    {
                        'queries': [...queryArray],
                        'files': pdf
                    }
                ).then((result) => (result.data))
                    .then((data) => {
                        setResult(data);
                        setDoc(data.documents);
                        setLoading(false);
                        setTabValue(2);

                    })
            }
        }
        catch (err) {
            // TODO find a way to parse errors
            setLoading(false)
            setTabValue(2);
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
                    paddingTop: '80px',
                }}
            >
                <Paper elevation={6}
                    sx={{
                        m: '20px',
                        p: '20px',
                        maxWidth: '80%',
                        minWidth: '80%'

                    }}
                >
                    <Tabs
                        variant="fullWidth"
                        indicatorColor='primary'
                        value={tabValue}
                        centered
                        onChange={handleTabChange}>
                        <Tab label="Web Scraping" />
                        <Tab label="PDF Scraping" />
                        <Tab name="results" label="Results" disabled={disableResult} />
                    </Tabs>
                    <form>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={tabValue}
                            onChangeIndex={handleTabChange}
                        >
                            <TabPanel
                                value={tabValue}
                                index={0}
                            >
                                <Box
                                    sx={{
                                        my: 3,

                                    }}>
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

                                <Box display='flex' flexDirection='column' sx={{ position: "relative" }}>
                                    <TextField
                                        label="Query"
                                        name="Query"
                                        fullWidth
                                        margin="normal"
                                        inputRef={queryRef}
                                        error={queryErrorMessage.length > 1}
                                        required
                                        helperText={queryErrorMessage}
                                        onBlur={handleBlurQuery}
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
                                                        <AddIcon />
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
                                                key={query}
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
                                    <Box
                                        sx={{ position: "relative" }}
                                    >
                                        <Button
                                            fullWidth
                                            onClick={handleSubmit}
                                            disabled={queryArray.length < 1 || url.length < 1 || loading}
                                            type="submit"

                                        >
                                            {loading ? "Searching" : "Submit"}
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={30}
                                                sx={{
                                                    position: 'absolute',
                                                    left: "49%",
                                                    top: "10%",
                                                    zIndex: 1,
                                                }}
                                            />
                                        )}
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
                                                inputRef={queryRef}
                                                margin="normal"
                                                error={queryErrorMessage.length > 1}
                                                helperText={queryErrorMessage}
                                                onBlur={handleBlurQuery}
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
                                                                <AddIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            >
                                            </TextField>
                                        </Box>
                                        {queryArray.map((query) => (
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

                                        ))}
                                        <Box display="flex" paddingY='20px' >
                                            <Paper

                                                elevation={8}
                                                sx={{
                                                    flexGrow: 1,
                                                    marginRight: "10px",
                                                    width: '80%',
                                                    padding: '10px'
                                                }}
                                            >
                                                <Box display='flex'>
                                                    <Box display='flex' margin='10px' width="50%" sx={{ flexGrow: 1, }}>
                                                        <Typography variant='subtitle2' noWrap width="100%" >
                                                            {fileName}
                                                        </Typography>
                                                    </Box>
                                                    <Box display='flex' margin='10px'>
                                                        <Typography variant='subtitle2'>
                                                            {(isFilePicked) ? (pdf.size / 1024).toFixed(2) : 0} MB
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <IconButton
                                                            onClick={() => {
                                                                removeFile();
                                                            }}
                                                        >
                                                            < RemoveIcon color='primary' />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </Paper>


                                            <Tooltip title="Upload PDF">
                                                <Fab component="label" variant='contained' color='primary'
                                                    sx={{
                                                        ':hover': {
                                                            bgcolor: 'secondary.main', // theme.palette.primary.main
                                                        },
                                                    }}
                                                >
                                                    <input hidden accept='application/pdf' type="file" onChange={handleFileInput} ref={fileRef} />
                                                    <UploadFileIcon />
                                                </Fab>

                                            </Tooltip>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{ position: "relative" }}
                                    >
                                        <Button
                                            fullWidth
                                            onClick={handleSubmit}
                                            disabled={queryArray.length < 1 || !isFilePicked || loading}
                                            type="submit"
                                        >
                                            {loading ? "Searching" : "Submit"}
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={30}
                                                sx={{
                                                    position: 'absolute',
                                                    left: "49%",
                                                    top: "10%",
                                                    zIndex: 1,
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </TabPanel>
                            <TabPanel value={tabValue} index={2}>
                                <Box sx={{ my: 3 }}>
                                    <Typography variant='h4' gutterBottom>
                                        Results
                                    </Typography>
                                    <Box>
                                        {(result != null) ? <Answer document={result.documents} sendProps={sendProps} answers={result.answers}></Answer> : null}
                                    </Box>
                                </Box>
                            </TabPanel>
                        </SwipeableViews>
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