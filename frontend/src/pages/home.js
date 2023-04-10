import Head from 'next/head';
import PropTypes from 'prop-types';
import { DashboardLayout } from '../components/dashboard-layout';
import {
    Box,
    Divider,
    Paper,
    Typography,
    Link,
} from '@mui/material';
import { StyledButton } from '../components/datawrangling/button-enlarge';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ConstructionIcon from '@mui/icons-material/Construction';
import LayersIcon from '@mui/icons-material/Layers';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Product } from '../icons/box';


const items = [
    {
        title: "Data Analytics Product Modeling",
        icon: <AssessmentOutlinedIcon sx={{ color: 'white' }} />,
        href: "/data-analytics-product-modeling"
    },
    {
        title: "Data Analytics Product Development",
        icon: <Inventory2OutlinedIcon sx={{ color: 'white' }} />,
        href: "/data-analytics-product-development"
    },
    {
        title: "Model and Analytics Product Evaluation",
        icon: <VerifiedOutlinedIcon sx={{ color: 'white' }} />,
        href: "/model-and-analytics-product-evaluation"
    },
    {
        title: "Data Analytics Product Deployment",
        icon: <TerminalOutlinedIcon sx={{ color: 'white' }} />,
        href: "/data-analytics-product-development"
    },
    {
        title: "Monitoring, Maintenance and Upgrades",
        icon: <GradingOutlinedIcon sx={{ color: 'white' }} />,
        href: "/monitoring-maintenance-and-upgrades"
    },
    {
        title: "Data Preparation",
        icon: <FilterAltOutlinedIcon sx={{ color: 'white' }} />,
        href: "/data-preparation"
    }
]

const ButtonWithText = (props) => {
    const { icon, iconSize, text, width, height, iconPosition, href, ...others } = props
    if (iconPosition == "left") {
        return (
            <Box>
                <Paper
                    sx={{
                        display: 'flex',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: `${width}px`,
                        height: `${height}px`,
                        padding: '25px',
                        paddingLeft: `${iconSize / 2 * 1.3}px`,
                    }}
                >
                    <Link href={href}>
                        <StyledButton
                            sx={{
                                position: 'absolute',
                                width: `${iconSize}px`,
                                height: `${iconSize}px`,
                                top: `${height / 2 - iconSize / 2}px`,
                                left: `${-iconSize / 2}px`
                            }}
                        >
                            {icon}

                        </StyledButton>
                    </Link>
                    <Typography align='center' fontSize={12} >
                        {text}
                    </Typography>
                </Paper>
            </Box>
        )
    } else if (iconPosition == "right") {
        return (
            <Paper
                sx={{
                    display: 'flex',
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: `${width}px`,
                    height: `${height}px`,
                    padding: '25px',
                    paddingRight: `${iconSize / 2 * 1.5}px`,
                }}
            >
                <Link href={href}>
                    <StyledButton
                        sx={{
                            position: 'absolute',
                            width: `${iconSize}px`,
                            height: `${iconSize}px`,
                            top: `${height / 2 - iconSize / 2}px`,
                            right: `${-iconSize / 2}px`
                        }}
                    >
                        {icon}
                    </StyledButton>
                </Link>
                <Typography align='center' fontSize={12} >
                    {text}
                </Typography>
            </Paper>
        )
    } else if (iconPosition == "bottom") {
        return (

            <Paper
                sx={{
                    display: 'flex',
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: `${width}px`,
                    height: `${height}px`,
                    padding: '25px',
                    paddingBottom: `${iconSize / 2 * 1.5}px`,
                }}
            >
                <Link href={href}>
                    <StyledButton
                        sx={{
                            position: 'absolute',
                            width: `${iconSize}px`,
                            height: `${iconSize}px`,
                            right: `${width / 2 - iconSize / 2}px`,
                            bottom: `${-iconSize / 2}px`
                        }}
                    >
                        {icon}
                    </StyledButton>
                </Link>
                <Typography align='center' fontSize={12} >
                    {text}
                </Typography>
            </Paper>
        )
    } else if (iconPosition == "top") {
        return (
            <Paper
                sx={{
                    display: 'flex',
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: `${width}px`,
                    height: `${height}px`,
                    padding: '25px',
                    paddingTop: `${iconSize / 2 * 1.5}px`,
                }}
            >
                <Link href={href}>
                    <StyledButton
                        sx={{
                            position: 'absolute',
                            width: `${iconSize}px`,
                            height: `${iconSize}px`,
                            right: `${width / 2 - iconSize / 2}px`,
                            top: `${-iconSize / 2}px`
                        }}
                    >
                        {icon}
                    </StyledButton>
                </Link>
                <Typography align='center' fontSize={12} >
                    {text}
                </Typography>
            </Paper>
        )
    }
}
ButtonWithText.defaultProps = {
    href: "/",
    iconPosition: "left",
    iconSize: 40
}


const Comp = (props) => {
    const { items, buttonSize, icon, margin, ...others } = props;
    const radius = 85
    const width = 2 * (radius + 40 + 160)
    const height = 2 * (radius + 40 + 80)
    const number = items.length
    // positions will be in {x,y} format
    const positions = []
    const angle = 2 * Math.PI / number
    const ini_angle = 0
    const centre = {
        x: width / 2,
        y: height / 2
    }
    const readjustment_vector = {
        x: -buttonSize / 2,
        y: -buttonSize / 2
    }

    items.map((item) => {
        const position = {
            x: Math.cos(ini_angle - Math.PI / 2),
            y: Math.sin(ini_angle + Math.PI / 2),
            variant: "",
            offset: {},
        }
        const variant = (Math.round(position.y) == 1 && Math.round(position.x) == 0) ? "bottom"
            : (Math.round(position.y) == -1 && Math.round(position.x) == 0) ? "top"
                : (position.x > 0) ? "left"
                    : "right"
        position.variant = variant
        const offset = (variant == "bottom") ? { x: 0, y: 80 / 2 } : (variant == "top") ? { x: 0, y: -80 / 2 } : (variant == "left") ? { x: 160 / 2, y: 0 } : { x: -160 / 2, y: 0 }
        position.offset = offset
        positions.push(position)
        ini_angle = ini_angle + angle
    })
    return (
        <Paper elevation={5}
            sx={{
                backgroundColor: "secondary.light",
                height: `${height}px`,
                width: `${width}px`,
                position: "relative",
                borderRadius: 5,
                margin: `${margin}px`
            }}
        >
            <Box
                sx={{
                    // border: 1,
                    // borderColor: 'black',
                    position: "absolute",
                    width: `${radius * 1.5}px`,
                    bottom: `${height / 2 - 25}px`,
                    left: `${width / 2 - radius * 1.5 / 2}px`,
                }}
            >
                <Typography align='center' variant='body1' fontWeight={1000} color="primary.main">
                    Data Analytics Product Lifecycle
                </Typography>
            </Box>
            {
                positions.map((item, index) => (
                    <Box
                        key={`button_${index}`}
                        sx={{
                            position: 'absolute',
                            bottom: `${height / 2 - 80 / 2 + item.y * radius + item.offset.y}px`,
                            left: `${width / 2 - 160 / 2 + item.x * radius + item.offset.x}px`,
                        }}
                    >
                        <ButtonWithText
                            icon={items[index].icon}
                            text={items[index].title}
                            height={80}
                            width={160}
                            iconPosition={
                                item.variant
                            }
                            iconSize={40}
                            href={items[index].href}
                        >

                        </ButtonWithText>
                    </Box>
                ))
            }

        </Paper>
    )
}
Comp.propTypes = {
    children: PropTypes.node,
    items: PropTypes.array.isRequired,
    buttonSize: PropTypes.number.isRequired,
    icon: PropTypes.node
}

const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Home
                </title>
            </Head>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: "center",
                    paddingTop: '70px',
                    margin: 'auto',
                    paddingX: '40px',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        paddingY: '20px',
                        marginY: '20px'
                    }}
                >
                    <Typography variant='h1'>
                        ADiBA Process Framework
                    </Typography>
                </Box>
                <Divider variant='middle' >

                </Divider>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '30px',
                        paddingY: '40px',
                        overflow: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            height: 80,
                            width: 140,
                            marginLeft: '40px'
                        }}
                    >
                        <ButtonWithText
                            height={80}
                            width={140}
                            iconSize={60}
                            icon={<HandshakeIcon sx={{ color: 'white' }} />}
                            text="Enterprise Big Data Analytics Preparation"
                            href='/enterprise-big-data-analytics-preparation'
                            iconPosition="left" />
                    </Box>
                    <ArrowRightIcon fontSize='large' />
                    <Box
                        sx={{
                            height: 80,
                            width: 140,
                            marginLeft: '35px'
                        }}
                    >
                        <ButtonWithText
                            height={80}
                            width={140}
                            iconSize={60}
                            icon={<Diversity3Icon sx={{ color: 'white' }} />}
                            text="Business Understanding"
                            href='/business-understanding'
                            iconPosition="left" />
                    </Box>
                    <ArrowRightIcon fontSize='large' />
                    <Box display='flex' flexDirection='column' justifyContent='space-between'
                        sx={{
                            height: `${4 * (80 + 60)}px`,
                            minWidth: "200px",
                            padding: "40px",
                            backgroundColor: "secondary.light",
                            borderRadius: 5,
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <ButtonWithText
                                height={80}
                                width={160}
                                iconSize={60}
                                icon={<AccountBalanceOutlinedIcon sx={{ color: 'white' }} />}
                                text="Data Governance"
                                href='/data-governance'
                                iconPosition="top" />
                            <ArrowDropDownIcon fontSize='large' />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <ArrowDropUpIcon fontSize='large' />
                            <Box sx={{ marginTop: '35px' }}>
                                <ButtonWithText
                                    height={80}
                                    width={160}
                                    iconSize={60}
                                    icon={<LayersIcon sx={{ color: 'white' }} />}
                                    text="Data Management and Understanding"
                                    href='/data-management-and-understanding'
                                    iconPosition="top" />
                            </Box>
                            <ArrowDropDownIcon fontSize='large' />

                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <ArrowDropUpIcon fontSize='large' />
                            <Box sx={{ marginTop: '35px' }}>
                                <ButtonWithText
                                    height={90}
                                    width={160}
                                    iconSize={60}
                                    icon={<ConstructionIcon sx={{ color: 'white' }} />}
                                    text="Tools, Technology, and Infrastructure Procurement"
                                    href='/tools-techbology-and-infrastructure-procurement'
                                    iconPosition="top" />
                            </Box>
                        </Box>
                    </Box>
                    <ArrowRightIcon fontSize='large' />
                    <Box
                        sx={{
                            height: 80,
                            width: 120,
                            marginLeft: '35px'
                        }}
                    >
                        <ButtonWithText
                            height={80}
                            width={120}
                            iconSize={60}
                            icon={<Diversity3Icon sx={{ color: 'white' }}></Diversity3Icon>}
                            text="Project Planning"
                            href='/project-planning'
                            iconPosition="left" />
                    </Box>
                    <ArrowRightIcon fontSize='large' />
                    <Box

                    >
                        <Comp
                            buttonSize={40}
                            paddingx={20}
                            paddingy={20}
                            items={items}
                        >
                        </Comp>
                    </Box>
                    <ArrowRightIcon fontSize='large' />
                    <Box
                        sx={{
                            height: 80,
                            width: 160,
                            marginLeft: '35px'
                        }}
                    >
                        <ButtonWithText
                            height={80}
                            width={160}
                            iconSize={60}
                            icon={<SupervisedUserCircleIcon sx={{ color: 'white' }}></SupervisedUserCircleIcon>}
                            text="Data Product Enculturation"
                            href='/data-product-enculturation'
                            iconPosition="left" />
                    </Box>
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