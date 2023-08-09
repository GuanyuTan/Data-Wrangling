import Head from 'next/head';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Answer } from '../components/datawrangling/answers'
import { DashboardLayout } from '../components/dashboard-layout';
import {
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { TableA } from '../components/dashboard/threat_table';
import Image from 'next/image';



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
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingTop: '80px',
                }}
            >
                <Grid container
                    sx={{
                        display: 'flex',
                        m: '20px',
                        p:'0px',
                        maxWidth: '70%',
                        minWidth: '70%',
                        justifyContent: '',
                    }}
                >
                    <Grid item lg={6} display={'flex'} flexDirection='column' justifyContent={'space-between'} >
                        <Box sx={{ marginBottom: '5px' }}>
                            <Typography variant='h1'>
                                Accelerating Digital Transformation through Big Data Adoption
                            </Typography>
                            <Typography variant='h1'>
                                (ADiBA)
                            </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '5px' }}>
                            <Typography variant='body' fontSize={20}>
                                Business digitalization journey made easy with data analytics
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Box marginRight='5px'>
                                <Button variant='contained'>
                                    TRY FOR FREE
                                </Button>
                            </Box>
                            <Box>
                                <Button variant='outlined'>
                                    SEE HOW IT WORKS
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={6}>
                        <Image src={'/illus-2.png'} width='1000px' height='700px'>

                        </Image>
                    </Grid>
                </Grid>
                <Paper
                    sx={{
                        display: 'flex',
                        m: '20px',
                        paddingX: '20px',
                        paddingY:'5px',
                        maxWidth: '70%',
                        minWidth: '70%',
                        justifyContent: '',
                    }}
                >
                    <Grid container
                        sx={{
                            display: 'flex',
                            m: '20px',
                            p: '0px',
                            paddingBottom: '5px',
                            justifyContent: '',
                        }}
                    >
                        <Grid item lg={4} display={'flex'} flexDirection='column' justifyContent={'space-between'}>
                            <Box>
                                <Typography variant='h1'>
                                    Bring Your Business To A New Height
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant='body' fontSize={18}>
                                    Tapping into the power of Big Data Analytics.
                                </Typography>
                                <br>
                                </br>
                                <Typography variant='body' fontSize={18}>
                                    Transform your business in Digitalization Age.
                                </Typography>
                            </Box>
                            <Box marginRight='5px' marginTop='7px'>
                                <Button variant='contained'>
                                    TRY FOR FREE
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item lg={8}>
                            <Box display='flex' justifyContent='center'>
                                <Image src={'/illus-3.png'} width={500} height={400}>

                                </Image>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper
                    sx={{
                        display: 'flex',
                        m: '20px',
                        paddingX: '20px',
                        paddingY:'5px',
                        maxWidth: '70%',
                        minWidth: '70%',
                        justifyContent: '',
                    }}
                >
                    <Grid container
                        spacing={2}
                        sx={{
                            display: 'flex',
                            m: '20px',
                            p: '0px',
                            justifyContent: '',
                        }}
                    >
                        <Grid item lg={6} display={'flex'} flexDirection='column' justifyContent={'space-between'}>
                            
                            <Box>
                                <Typography variant='h2'>
                                    A Step-by-step Digital Transformation guide using Big Data Analytics.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant='body' fontSize={18}>
                                    Wow this project is awesome! Let me tell you why right here, right now.
                                </Typography>
                            </Box>
                            <Box marginRight='5px' marginTop='7px'>
                                <Button variant='contained'>
                                    SIGN UP NOW
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item lg={6}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                            <Box sx={{ marginBottom: '7px' }}>
                                <Typography variant='h2'>
                                    Step 1: Register
                                </Typography>
                                <Typography variant='body' fontSize={18}>
                                    Register with us!
                                </Typography>
                                <br />
                                <Typography variant='body' fontSize={18}>
                                    Let our experts help you in your digital transformation planning journey.
                                </Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'neutral.300' }} />
                            <Box sx={{ marginBottom: '7px' }}>
                                <Typography variant='h2'>
                                    Step 2: Use Our Tools
                                </Typography>
                                <Typography variant='body' fontSize={18}>
                                    Follow the step-by-step guides in our 12+1 process framework to roll out your digital transformation plan.
                                </Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'neutral.300' }} />
                            <Box sx={{ marginBottom: '7px' }}>
                                <Typography variant='h2'>
                                    Step 3: Engage With Us
                                </Typography>
                                <Typography variant='body' fontSize={18}>
                                    Our experts will assist you in a hand-holding approach.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

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