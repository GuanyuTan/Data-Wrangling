import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ChildCare, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Collapse, ListItem, ListItemButton, ListItemText, MenuItem } from '@mui/material';
import { MenuDropDown } from './menu-dropdown';
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    usePopupState,
    bindFocus,
    bindHover,
    bindMenu,
} from 'material-ui-popup-state/hooks'

export const NavItem = (props) => {
    const { href, title, id, items, ...others } = props;
    const popupState = usePopupState({
        variant: 'popover',
        popupId: `menu${id}`,
    })
    const router = useRouter();



    if (items.length > 0) {
        return (
            <ListItem disableGutters>
                <Button
                    {...bindHover(popupState)}
                    {...bindFocus(popupState)}
                    endIcon={<ArrowDropDownIcon fontSize='small' ></ArrowDropDownIcon>}
                    disableRipple
                    sx={{
                        width: '100%',
                        // justifyContent: 'flex-start',
                        textAlign: 'center',
                    }}
                >
                    {title}
                </Button>
                <HoverMenu
                    {...bindMenu(popupState)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    {items.map(item => (
                        <Link key={item.href} href={`${item.href}`}>
                            <MenuItem onClick={popupState.close} key={item.title}>
                                {item.title}
                            </MenuItem>
                        </Link>
                    ))}

                </HoverMenu>
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
                    component="a"
                    disableRipple
                    sx={{
                        width: '100%',
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

