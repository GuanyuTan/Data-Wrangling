import Head from 'next/head';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Answer } from '../components/data-wrangling/answers'
import { DashboardLayout } from '../components/dashboard-layout';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Paper,
    Typography,
    TextField,
    IconButton,
    Button,
    Divider,
    Snackbar,
    Alert,
    Pagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from 'react';
import { QueryComponent } from '../components/data-wrangling/query-component';
import Highlighter from 'react-highlight-words';
import { Router, useRouter } from 'next/router';
import { SearchBar } from '../components/data-wrangling/search-bar';
import CloseIcon from '@mui/icons-material/Close';
import SelectionHighlighter from 'react-highlight-selection'


const queries = [
    "query1", "query2", "query3"
]

const Page = () => {

    const router = useRouter();
    const [selectedAcc, setSelectedAccordion] = useState(0);
    const [search, setSearch] = useState([])
    const [queryAns, setQueryAns] = useState([]);
    const [queryDoc, setQueryDoc] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState([]);
    const [doc, setDoc] = useState([]);
    const [textOnly, setTextOnly] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [queryPlaceholder, setQuery] = useState("");
    const [error, setError] = useState({});
    const [openSnack, setOpenSnack] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const page_ = useRef(0);
    const [selection, setSelectedContext] = useState({});
    const [openId, setOpenId] = useState(0);


    let {
        isReady,
        query: {
            document_,
            queryArray
        }
    } = router;

    useEffect(() => {
        if (!isReady) {
            console.log('Router not ready');
            return;
        }
        if (doc.length == 0) {

            if (typeof queryArray === "string") {
                const copy = queryArray
                queryArray = []
                queryArray.push(copy)
            }

            const d = JSON.parse(document_)
            setDoc([...d])
            const a = []
            d.forEach(element => {
                a.push(element.content)
            })
            setTextOnly([...a])
            const arr = [];
            queryArray.forEach(element => {
                arr.push({
                    query: element,
                    answer: ""
                })
            });
            setQueryAns([...arr])
            const textarea = document.getElementById('textarea')
            textarea.addEventListener('mouseup', onMouseUp, false)
        }
    }, [isReady]);

    const onMouseUp = (e) => {
        console.log(e)
        setSelectedContext({
            context: window.getSelection().toString(),
            pageIndex: page_.current
        })
    }
    
    const handleSubmit = async () => {
        if (queryAns.length < 1) {
            setError({
                message: 'No Query Given',
                type: 'error'
            })
        } else {
            const body_ = JSON.stringify(
                {
                    "query_ans": queryAns,
                    "document": {
                        "content": textOnly,
                        "id": 0,
                    }
                }
            )
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/train`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': `${process.env.NEXT_PUBLIC_API_URL}/api/train`
                    },
                    body: body_
                }
            ).then((response) => (
                setError({
                    message: 'Done',
                    type: 'success'
                })
            ))
            setError({
                message: 'Sent for training',
                type: 'info'
            })
        }
        setOpenSnack(true);
    }
    const handleChange = (e) => {
        const string = e.target.value.trim();
        setQuery(string);
    }

    const clearQueries = (e) => {
        e.stopPropagation();
        setQueryAns([]);
        setQueryDoc([]);
    }

    const handleCreate = () => {
        if (queryPlaceholder) {
            const copy = [...queryAns];
            copy.push({
                id: queryAns.length,
                query: queryPlaceholder,
                ans: "",
            });
            setQueryAns([...copy]);
            setQuery("");
            const copy_ = [...queryDoc]
            copy_.push({
                doc_index: 0
            })
            setQueryDoc(copy_)
        }
        handleDialogClose();
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    }
    const addQueryComponent = () => {
        setOpenDialog(true);
    }

    const handlePageChange = (event, page) => {
        page_.current = page-1
        setPageIndex(page-1)
    }

    const handleSelection = (s) => {
        const copy = [...queryDoc]
        copy[selectedAcc] = pageIndex
        setQueryDoc([...copy])
        setSelectedContext(s)
    }

    const handleAccChange = (id) => (event, isExpanded) => {
        console.log('Pressed')
        if (isExpanded) {
            setOpenId(id)
            setSelectedAccordion(id)

        } else {
            setOpenId(-1)
            setSelectedAccordion(-1)
        }
    };

    return (
        <>
            <Head>
                <title>
                    Data Wrangling
                </title>
            </Head>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose} >
                <Alert variant='filled' severity={(error) ? error.type : 'info'}>
                    {(error) ? error.message : ''}
                    <IconButton onClick={handleSnackClose}>
                        <CloseIcon
                            aria-label="close"
                            sx={{ color: 'white', fontSize: 15 }}
                        >

                        </CloseIcon>
                    </IconButton>
                </Alert>

            </Snackbar>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Enter a Query</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Query"
                        fullWidth
                        multiline
                        variant="standard"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button disabled={queryPlaceholder === ""} onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    paddingTop: '80px',
                    height: '100%'
                }}
            >
                <Paper elevation={6}
                    sx={{
                        margin: '20px',
                        padding: '20px',
                        maxWidth: '80%',
                        minWidth: '80%',
                    }}
                >
                    <Box>
                        <Typography variant='h4'>
                            Retraining Pipeline
                        </Typography>
                    </Box>
                    <Divider sx={{ borderColor: 'neutral.300' }} />

                    <Box
                        sx={{ display: 'flex', height: "90%" }}
                    >
                        <Box
                            width="40%"
                            padding="20px"
                            height="100%"
                        >
                            <Box display='flex' alignItems="center" justifyContent='space-between' height="20px" paddingY="20px" marginBottom="10px">
                                <Box>
                                    <Typography>
                                        Query
                                    </Typography>
                                </Box>
                                <Box>
                                    <IconButton onClick={addQueryComponent}>
                                        <AddIcon color='primary' />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box overflow="auto" height="600px">
                                {queryAns.map((query, index) => (
                                    <QueryComponent
                                        key={index}
                                        maxWidth="100%"
                                        queryAns={queryAns}
                                        setQueryAns={setQueryAns}
                                        id={index}
                                        openId={openId}
                                        handleAccChange={handleAccChange}
                                        selection={selection}
                                        setSelectedDoc={setSelectedDoc}
                                    >

                                    </QueryComponent>
                                )

                                )}
                            </Box>

                        </Box>
                        <Divider
                            orientation='vertical'
                            variant='middle'
                            sx={{ borderColor: 'neutral.300' }}
                        >

                        </Divider>
                        <Box
                            sx={{
                                width: "60%",
                                padding: "20px",
                            }}
                        >
                            <Box display="flex" height="20px" paddingY="20px" alignItems="center" justifyContent="space-between" marginBottom="10px">
                                <Typography>
                                    Document
                                </Typography>
                                <SearchBar height="30px" setSearch={setSearch}>

                                </SearchBar>
                            </Box>
                            <Box height="90%"  >
                                <Typography id='textarea' height="600px" overflow="auto">
                                    {textOnly[pageIndex]}
                                </Typography>
                            </Box>
                            <Box
                                display='flex'
                                justifyContent='space-around'
                            >
                                <Pagination count={textOnly.length} onChange={handlePageChange}>

                                </Pagination>
                            </Box>

                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <Box>
                            <Button onClick={clearQueries}>
                                Clear Queries
                            </Button>
                        </Box>
                        <Box>
                            <Button onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Box>

                    </Box>
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