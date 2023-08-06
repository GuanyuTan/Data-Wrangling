import Head from 'next/head';
import NextLink from 'next/link';
import { DashboardLayout } from '../components/dashboard-layout';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Button,
} from '@mui/material';
import Image from 'next/image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CustomAccordion } from '../components/intro-accordion';
import { AdibaCircularButtonGraph, StyledButton } from '../components/adiba/circular-graph';

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
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    paddingTop: '80px',
                }}
            >
                {/* <AdibaCircularButtonGraph>

                </AdibaCircularButtonGraph> */}
                <Box paddingX='10%'>
                    <CustomAccordion title='The 7 components of ADiBA'>
                        <AdibaCircularButtonGraph></AdibaCircularButtonGraph>
                    </CustomAccordion>
                </Box>
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