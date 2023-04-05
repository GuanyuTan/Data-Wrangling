import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, imageListClasses, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { MulItem } from './nav_item_mul';

const menuItems =
  [
    {
      title: "Repository",
      sub:
        [
          {
            href: '/strat',
            title: 'Strategic Teams Setup and Enculturation Preparation',
          },
          {
            href: '/busi',
            title: 'Business Understanding',
          },
          {
            href: '/manage',
            title: 'Data Management and Understanding',
          },
        ]
    },
  ]

const items = [
  {
    href: '/recommender',
    title: 'Recommender',
  },
  {
    href: '/crawler',
    title: 'Crawler',
  },
  {
    href: '/services',
    title: 'Services',
  },
  {
    href: '/survey',
    title: 'Survey',
  },
  {
    href: '/training',
    title: 'Training',
  }
]

export const DashboardSidebar = (props) => {
  const { open, onClose, login } = props;
  const router = useRouter();
  const lgUp = useMediaQuery(
    (theme) => theme.breakpoints.up('lg'),
    {
      defaultMatches: true,
      noSsr: false
    });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Link
            href="/"
            passHref
          >
            <a>
              <img src='adiba.png' width={200} />
            </a>
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <NavItem
          key="Home"
          href="/"
          title="Home"

          />
          {
            menuItems.map((item) => (
              <MulItem
                key={item.title}
                title={item.title}
                children={item.sub}
              >

              </MulItem>
            ))
          }
          {items.map((item) => (
            <NavItem
              key={item.title}
              href={item.href}
              title={item.title}
            />
          ))}

        </Box>
      </Box>
    </>
  );

  // if (lgUp) {
  //   return (
  //     <Drawer
  //       anchor="left"
  //       open
  //       PaperProps={{
  //         sx: {
  //           backgroundColor: 'neutral.100',
  //           color: '#FFFFFF',
  //           width: 280
  //         }
  //       }}
  //       variant="permanent"
  //     >
  //       {content}
  //     </Drawer>
  //   );
  // }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.100',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
