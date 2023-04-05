import Head from 'next/head';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Answer } from '../components/datawrangling/answers'
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
import { useEffect, useRef, useState } from 'react';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { maxHeight } from '@mui/system';
import { TableA } from '../components/dashboard/threat_table';



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
                        minWidth: '80%',
                        
                    }}
                >
                    <Box>
                        <Typography variant='h4' gutterBottom>
                            Phase 0: Immersion Of Analytic Culture
                        </Typography>
                    </Box>
                    <Box>
                        <TableA>

                        </TableA>
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