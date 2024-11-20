import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getUserData } from '../utils/userInformation';
import profile from '../assets/img/1x1Robot2.png';
import customFetch from '../utils/fetchApi';

export default function AccountMenu({logoutOnClick}) {

    const user = getUserData();
    const [profilePicture, setProfilePicture] = useState(profile);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const storedProfilePicture = localStorage.getItem("profilePicture");
        
        
        if(!storedProfilePicture) {
    
            customFetch('/profile/picture/fetch')
            .then(data => {
                setProfilePicture(data.path);
                localStorage.setItem("profilePicture", data.path);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
            } else {
            setProfilePicture(storedProfilePicture);
            }
        
            
        }, []);


  return (
    <>
        <Tooltip title="Account settings">
            <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
        >
            <img src={profilePicture} alt="" />
            </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar src={profilePicture} style={{objectFit: 'cover'}}/> {user.name}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => logoutOnClick()}>
            <FontAwesomeIcon icon={faRightFromBracket} style={{marginRight: '5px', fontSize: '.8rem'}}/> Logout
        </MenuItem>
      </Menu>
    </>
  )
}
