import { Box, Link, List, ListItem, Paper, Typography, styled } from "@mui/material"
import { height, width } from "@mui/system"
import Image from "next/image"

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
        href: ''
    },
    {
        title: 'SERVICES',
        href: ''
    },
    {
        title: 'ABOUT US',
        href: ''
    },
    {
        title: 'CONTACT',
        href: ''
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
            <Link href={item.href} key={item.title} style={{textDecoration: 'none'}} color={'neutral.500'}>
                <Typography fontWeight={600}>
                    {item.title}
                </Typography>
            </Link>
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
                        <Link>
                            <a>
                                <Image src='/adiba.png' width={140} height={140 / 2} alt='logo' />
                            </a>
                        </Link>
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