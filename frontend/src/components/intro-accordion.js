import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { useState } from "react";


const items = [
    {
        title: 'ADiBA Services',
        color: '',
        icon: '',
    },
    {
        title: 'ADiBA Repository',
        color: '',
        icon: '',
    },
    {
        title: 'ADiBA Crawler',
        color: '',
        icon: '',
    },
    {
        title: 'ADiBA Recommender',
        color: '',
        icon: '',
    },
    {
        title: 'ADiBA Framework',
        color: '',
        icon: '',
    }
]

export const CustomAccordion = (props) => {
    const { children, title, ...others } = props
    const [expanded, setExpanded] = useState(true)
    const handleChange = (event) =>{
        setExpanded(!expanded)
    } 
    return (
        <Accordion
            elevation={12}
            expanded={expanded}
            onChange={handleChange}
            sx={{
                // border: '1px solid black'
                
            }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography variant='h3' fontWeight={520}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',

                    }}>
                    {children}
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

CustomAccordion.propTypes = {
    title: PropTypes.string,
    details: PropTypes.node
}