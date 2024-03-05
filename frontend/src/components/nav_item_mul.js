import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Collapse, ListItem, ListItemText } from '@mui/material';
import { NavItem } from './nav-item';

export const MulItem = (props) => {
    const { title, list, ...others } = props;
    const [open, toggleOpen] = useState(false);
    const handleClick = () => {
        toggleOpen(!open);
    }
    return (
        <>
            <ListItem
                sx={{
                    display: 'flex',
                    mb: 0.5,
                    py: 0,
                    px: 2
                }}
            >
                <Button
                    onClick={handleClick}
                    // component="a"
                    disableRipple
                    sx={{
                        backgroundColor: open && 'rgb(80, 199, 242, 0.25)',
                        borderRadius: 1,
                        color: 'neutral.900',
                        fontWeight: 'fontWeightBold',
                        justifyContent: 'flex-start',
                        px: 3,
                        textAlign: 'left',
                        textTransform: 'none',
                        width: '100%',
                        '& .MuiButton-startIcon': {
                            color: 'neutral.400'
                        },
                        '&:hover': {
                            backgroundColor: 'rgb(80, 199, 242, 0.25)'
                        }
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        {title}
                    </Box>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </Button>
            </ListItem>
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
                disableGutters
            >

                {
                    list.map((child) => (
                        <NavItem
                        title={child.title}
                        href={child.href}
                        key={child.title}
                            sx={{
                                pl: 4,
                                pr: 2,
                                mb: 0.5,
                                py: 0
                            }}
                        />
                        // key={child.title}
                        // href={child.href}
                        // title={child.title}
                    ))
                }
            </Collapse>
        </>

    )
};

MulItem.propTypes = {
    title: PropTypes.string,
    list: PropTypes.array
};

