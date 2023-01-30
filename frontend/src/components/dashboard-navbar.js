import { useRef, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import { AccountPopover } from './account-popover';
import { minWidth } from '@mui/system';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <>
      <DashboardNavbarRoot
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <Box
            sx={{ display: 'inline-flex' }}
          >
            <IconButton
              onClick={onSidebarOpen}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              flexGrow: 1
            }}
          >
            <Link
              href="/"
              passHref
            >
              <a>
                <img src='adiba.png' width={95} />
              </a>
            </Link>
          </Box>
          <Box>
            <Avatar
              onClick={() => setOpenAccountPopover(true)}
              ref={settingsRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
                ml: 1
              }}
              src="/static/images/avatars/avatar_1.png"
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
          </Box>

        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
