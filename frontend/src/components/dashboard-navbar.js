import { useRef, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Box, Button, List, Toolbar } from '@mui/material';
import { useAuth } from '../contexts/auth';
import Image from 'next/image';
import { NavItem } from './navbar/navbar-item';
import ProfileAvatar from './account/account-avatar';


const menuItems = [
  {
    title: 'HOME',
    href: '/'
  },
  {
    title: 'ADIBA',
    items: [{
      title: 'What is ADIBA',
      href: '/about'
    }, {
      title: 'How it began',
      href: '/about'
    }],
  },
  {
    title: 'COMPONENTS',
    items: [{
      title: 'The 7 Components',
      href: '/components'
    }, {
      title: 'How ADiBA works',
      href: '/components'
    }],
  },
  {
    title: 'PEOPLE',
    href: '/people'
  },
  {
    title: 'CONTACT',
    href: '/contact'
  }
]
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const { isAuthenticated } = useAuth();

  return (
    <>
      <DashboardNavbarRoot
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            height: "80px",
            left: 0,
            px: 2
          }}
        >
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
                <Image src='/adiba.png' width={85} height={85 / 2} alt='logo' />
            </Link>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              flexGrow: 2,
              justifyContent: 'space-around'

            }}
          >
            <List sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100vh',
              justifyContent: 'space-between'
            }}>

              {
                menuItems.map(item => (
                  <NavItem title={item.title} key={item.title} items={item.items} href={item.href}>

                  </NavItem>
                ))
              }

            </List>
          </Box>
          {
            !isAuthenticated ?
              <Box
                sx={{
                  display: 'inline-flex',
                  flexGrow: 1,
                  justifyContent: 'flex-end'
                }}
              >
                <Box sx={{ marginX: '5px' }}>
                  <Link href={`/login`}>
                    <Button variant='text'>
                      SIGN IN
                    </Button>
                  </Link>
                </Box>
                <Box sx={{ marginX: '5px' }}>
                  <Link href={`/signup`}
                    style={{ textDecoration: 'none' }} color={'inherit'}>
                    <Button variant='contained'>
                      SIGN UP
                    </Button>
                  </Link>
                </Box>
              </Box>
              :
              <Box
                sx={{
                  display: 'inline-flex',
                  flexGrow: 1,
                  justifyContent: 'flex-end'
                }}
              >
                <Box sx={{ marginX: '5px' }}>
                  <ProfileAvatar/>
                </Box>
              </Box>
          }

        </Toolbar>
      </DashboardNavbarRoot >
      
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
