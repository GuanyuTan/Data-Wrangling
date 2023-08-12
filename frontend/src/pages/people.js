import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout";
import { Box } from "@mui/system";
import { Avatar, Card, CardContent, Grid, Skeleton } from "@mui/material";

const GridItem = (props) => {
    return (
        <Grid item xs={6} md={4} lg={4} display={'flex'} justifyContent={''} alignItems={'center'} spacing={3}>
            <Card sx={{ padding: '10px', width: '100%' }}>
                <CardContent>
                    <Box sx={{display:'flex'}} alignItems={'center'} justifyContent={'space-between'}>
                        <Avatar
                            // src={user.avatar}
                            sx={{
                                height: 128,
                                mb: 2,
                                width: 128
                            }}
                        />
                        <Skeleton variant="rectangular" width={'50%'} height={100} />
                    </Box>
                    <Skeleton variant="rectangular" width={'100%'} height={100} />
                </CardContent>

            </Card>
        </Grid >
    )
}

const Page = () => {
    return (
        <>
            <Head>
                ADiBA | Contact
            </Head>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    paddingTop: '80px',
                    height: '100%',
                    width: '100%',
                    overflow: 'auto'
                }}
            >
                <Grid container spacing={2} sx={{ marginX: '10%' }}>
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                    <GridItem />
                </Grid>

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