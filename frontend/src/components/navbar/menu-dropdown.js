import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ChildCare, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Collapse, ListItem, ListItemButton, ListItemText, MenuItem, Menu } from '@mui/material';

export const MenuDropDown = (props) => {
    const { items, open, anchorEl, handleClose, ...others } = props;
    return (
        <Menu open={open} anchorEl={anchorEl} onMouseLeave={handleClose}>
            {
                items.map(item => (
                    <MenuItem onClick={handleClose} key={item.title}>
                        {item.title}
                        {/* <Link href={item.href}>
                        </Link> */}
                    </MenuItem>
                ))
            }
        </Menu>
    )

};

MenuDropDown.defaultProps = {
    items: []
}

MenuDropDown.propTypes = {
    items: PropTypes.array,
    open: PropTypes.bool
};

