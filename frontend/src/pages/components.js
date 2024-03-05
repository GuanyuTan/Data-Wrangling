import Head from 'next/head';
import { DashboardLayout } from '../components/dashboard-layout';
import {
    Box,
    Typography,
} from '@mui/material';
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
                <Box paddingX='10%' marginBottom='10px'>
                    <CustomAccordion title='The 7 components of ADiBA'>
                        <AdibaCircularButtonGraph></AdibaCircularButtonGraph>
                    </CustomAccordion>
                </Box>
                <Box paddingX='10%' marginBottom='10px'>
                    <CustomAccordion title='How ADiBA works'>
                        <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
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