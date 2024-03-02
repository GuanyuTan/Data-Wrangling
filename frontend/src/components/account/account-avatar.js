import { Avatar, ListItemIcon, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../../contexts/auth";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { styled, alpha } from '@mui/material/styles'


const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        width: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const ProfileAvatar = () => {
    const router = useRouter()
    const { logout } = useAuth()
    const [anchor, setAnchor] = useState(null);
    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    }
    const handleClose = (event) => {
        setAnchor(null)
    }
    return (
        <>
            <Tooltip title="Account">
                <IconButton
                    onClick={handleClick}
                >
                    <Avatar>
                    </Avatar>
                </IconButton>
            </Tooltip>
            <StyledMenu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => {
                    router.push("/profile");
                    handleClose();
                }}>
                    <ListItemIcon>
                        <Avatar sx={{height:24,width:24}}/>
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => {
                    router.push("/profile");
                    handleClose();
                }}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={() => {
                    logout();
                    handleClose();
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Sign Out
                </MenuItem>
            </StyledMenu>
        </>
    )
}



export default ProfileAvatar;