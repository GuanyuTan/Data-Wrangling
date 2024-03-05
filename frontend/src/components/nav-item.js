import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button,  ListItem } from '@mui/material';

export const NavItem = (props) => {
  const { href, title, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;

  return (
    <ListItem
      disableGutters
      sx={{   
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <Link
        href={`${href}`}
        passHref
      >
        <Button
          // component="a"
          disableRipple
          sx={{
            backgroundColor: active && 'rgb(80, 199, 242, 0.25)',
            borderRadius: 1,
            color: active ? 'secondary.main' : 'neutral.900',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400'
            },
            '&:hover': {
              backgroundColor: 'rgb(80, 199, 242, 0.25)'
            }
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

NavItem.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string
};

