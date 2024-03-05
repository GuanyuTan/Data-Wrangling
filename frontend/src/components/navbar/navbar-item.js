import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Typography, ListItem, MenuItem } from '@mui/material';
import MuiLink from '@mui/material/Link';
import { MenuDropDown } from './menu-dropdown';
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    usePopupState,
    bindFocus,
    bindHover,
    bindMenu,
    bindPopover,
} from 'material-ui-popup-state/hooks'

export const NavItem = (props) => {
    const { href, title, id, items, ...others } = props;
    const popupState = usePopupState({
        variant: 'popover',
        popupId: `menu${id}`,
    })



    if (items.length > 0) {
        return (
            <ListItem disableGutters>
                <Button
                    {...bindHover(popupState)}
                    {...bindFocus(popupState)}
                    endIcon={<ArrowDropDownIcon fontSize='small' ></ArrowDropDownIcon>}
                    disableRipple
                    sx={{
                        width: "200px",
                        // justifyContent: 'flex-start',
                        textAlign: 'center',
                    }}
                >
                    {title}
                </Button>
                <HoverPopover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}

                >
                    {items.map(item => (
                        <Box width={"200px"} justifyContent="center" alignItems="center" key={item.title}>
                            <Link key={item.href} href={`${item.href}`} style={{ textDecoration: 'none' }}>
                                <MenuItem onClick={popupState.close} key={`${item.title}_1`} width="200px">
                                    <Typography color={'primary'} fontWeight={400}>
                                        {item.title}
                                    </Typography>
                                </MenuItem>
                            </Link>
                        </Box>
                    ))}

                </HoverPopover>
            </ListItem>
        )
    }
    return (
        <ListItem
            disableGutters

        >
            <Link
                href={`${href}`}
                style={{ textDecoration: 'none' }} color={'inherit'}
            >
                <Button
                    disableRipple
                    sx={{
                        width: '200px',
                        // justifyContent: 'flex-start',
                        textAlign: 'center',
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        {title}
                    </Box>
                </Button>
            </Link>
        </ListItem>
    );
};

NavItem.defaultProps = {
    items: []
}

NavItem.propTypes = {
    href: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.array
};

