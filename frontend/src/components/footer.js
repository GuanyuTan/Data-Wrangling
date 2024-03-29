import { Box, List, ListItem, Paper, Typography, styled } from "@mui/material"
import Image from "next/image"
import NextLink from "next/link"

const FooterListItem = styled(ListItem)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '50px',
    paddingTop: '20px',
    paddingBottom: '20px'
}))

const directoryList = [
    {
        title: 'HOME',
        href: '/'
    },
    {
        title: 'SERVICES',
        href: '/services'
    },
    {
        title: 'ABOUT US',
        href: '/about'
    },
    {
        title: 'CONTACT',
        href: '/contact'
    },
]
const socialList = [
    {
        title: 'FACEBOOK',
        href: ''
    },
    {
        title: 'INSTAGRAM',
        href: ''
    },
    {
        title: 'TWITTER',
        href: ''
    },
    {
        title: 'LINKEDIN',
        href: ''
    },
]
const policyList = [
    {
        title: 'PRIVACY POLICY',
        href: ''
    },
    {
        title: 'TERM OF SERVICE',
        href: ''
    }
]

const Links = (props) => {
    const { item, ...others } = props;
    return (
        <Box {...others}>
            <NextLink href={item.href} style={{ textDecoration: 'none' }} >
                    <Typography color={'neutral.500'} fontWeight={600}>
                        {item.title}
                    </Typography>
            </NextLink>
        </Box>
    )
}

export const Footer = () => {
    return (
        <Box
            sx={{
                height: '200px',
                width: '100%',
            }}>
            <Paper
                sx={
                    {
                        height: '100%'
                    }
                }>
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'flex-start',
                    }}>
                    <FooterListItem
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        }}>
                        <NextLink
                            href="/"
                            passHref
                        >
                                <Image src='/adiba.png' width={140} height={140 / 2} alt='logo' />
                        </NextLink>
                        <Typography>
                            2022&copy; ADIBA
                        </Typography>
                        <Typography>
                            All Rights Reserved
                        </Typography>
                    </FooterListItem>
                    <FooterListItem
                        sx={{
                            // justifyContent: 'space-around'
                        }}>
                        {directoryList.map(item => (
                            <Links
                                item={item}
                                key={item.title}
                                sx={{
                                    paddingBottom: '5px'
                                }}>

                            </Links>
                        ))}
                    </FooterListItem>
                    <FooterListItem
                        sx={{
                            // justifyContent:'space-around'
                        }}>
                        {socialList.map(item => (
                            <Links
                                item={item}
                                key={item.title}
                                sx={{
                                    paddingBottom: '5px'
                                }}>

                            </Links>
                        ))}
                    </FooterListItem>
                    <FooterListItem
                        sx={{
                            // justifyContent:'space-around'
                        }}>
                        {policyList.map(item => (
                            <Links
                                key={item.title}
                                item={item}
                                sx={{
                                    paddingBottom: '5px'
                                }}>

                            </Links>
                        ))}
                    </FooterListItem>
                </List>
            </Paper>
        </Box >
    )
}