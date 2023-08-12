import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout";
import { Box, width } from "@mui/system";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

const GridItem = (props) => {
    return (
        <Grid item xs={6} md={4} lg={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Avatar
                // src={user.avatar}
                sx={{
                    height: 128,
                    mb: 2,
                    width: 128
                }}
            />
        </Grid>
    )
}

const Page = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [ticket, setTicket] = useState('')
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleTicketChange = (event) => {
        setTicket(event.target.value)
    }
    return (
        <>
            <Head>
                ADiBA | Contact
            </Head>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '130px',
                }}
            >
                <Box
                sx={{width:'100wh'}}
                >
                    <Image src='/customer-service.png' width={'450px'} height={'450px'}>

                    </Image>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '400px',
                    marginLeft: '10px'
                }}>
                    <Typography variant="h2">
                        Contact Us
                    </Typography>
                    <Typography variant="subtitle1">
                        Feel free to get in touch.
                    </Typography>
                    <TextField
                        label="Name"
                        margin="normal"
                        name="username"
                        onChange={handleNameChange}
                        value={name}
                        variant="outlined"
                        fullWidth
                        required>
                    </TextField>
                    <TextField
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onChange={handleEmailChange}
                        value={email}
                        variant="outlined"
                        fullWidth
                        required>
                    </TextField>
                    <TextField
                        label="Your Thoughts"
                        margin="normal"
                        name="username"
                        onChange={handleTicketChange}
                        value={ticket}
                        variant="outlined"
                        fullWidth
                        multiline
                        required>
                    </TextField>
                    <Button
                        variant="contained"
                    >
                        Send Message
                    </Button>
                </Box>

            </Box >
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;