import Head from 'next/head';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Answer } from '../components/datawrangling/answers'
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from 'react';
import { QueryComponent } from '../components/datawrangling/query_component';
import Highlighter from 'react-highlight-words';
import { Router, useRouter } from 'next/router';
import { SearchBar } from '../components/datawrangling/search-bar';


const queries = [
    "query1", "query2", "query3"
]

const Page = () => {

    const router = useRouter();
    const [search, setSearch] = useState([])
    const [queryAns, setQueryAns] = useState([]);
    const [doc, setDoc] = useState("")
    const [open, setOpen] = useState(false);
    const [queryPlaceholder, setQuery] = useState("");

    const {
        isReady,
        query: {
            document,
            queryArray
        }
    } = router;

    useEffect(() => {
        if (!isReady) {
            console.log('Router not ready');
            return;
        }
        // console.log(queryArray);
        if (!doc) {
            if (typeof queryArray === "string") {
                const copy = queryArray
                queryArray = []
                queryArray.push(copy)
            }
            const str = ""  
            // JSON.parse(document).forEach((item)=>{
            //     str = str.concat(item.content)
            // })
            console.log(JSON.parse(document))
            setDoc(JSON.parse(document)[0].content)
            const arr = [];
            queryArray.forEach(element => {
                arr.push({
                    query: element,
                    answer: ""
                })
            });
            setQueryAns([...arr])
        }

    }, [isReady]);


    const handleSubmit = async () => {
        const body_ = JSON.stringify(
            {
                "query_ans": queryAns,
                "document": {
                    "content": doc,
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
        ).then((response)=>(console.log(response)))
    }
    const handleChange = (e) => {
        const string = e.target.value.trim();
        setQuery(string);
    }

    const clearQueries = (e) => {
        e.stopPropagation();
        setQueryAns([]);
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
        }
        handleClose();
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const addQueryComponent = () => {
        setOpen(true);
    }


    return (
        <>
            <Head>
                <title>
                    Data Wrangling
                    {console.log(doc)}
                </title>
            </Head>
            <Dialog open={open} onClose={handleClose}>
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
                    <Button onClick={handleClose}>Cancel</Button>
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
                    <Divider>

                    </Divider>
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
                                    <QueryComponent key={index} maxWidth="100%" queryAns={queryAns} setQueryAns={setQueryAns} id={index}>

                                    </QueryComponent>
                                )

                                )}
                            </Box>

                        </Box>
                        <Divider
                            orientation='vertical'
                            variant='middle'
                            flexItem="true"
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
                            <Box height="90%" >
                                <Typography height="600px" overflow="scroll">
                                    <Highlighter
                                        searchWords={search}
                                        textToHighlight={doc}
                                    >

                                    </Highlighter>
                                </Typography>
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