import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import menu from '../../assets/img/icons/menu.png';
import logo from '../../assets/img/logoCodelab.png';
import styles from '../../assets/css/templates/home-template.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserData } from '../../utils/userInformation';

export default function DrawerNav() {
    const [open, setOpen] = React.useState(false);
    const user = getUserData();
    const location = useLocation();
    const navigate = useNavigate();

    const tabName = location.pathname;

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const drawerContent = (
        <Box sx={{ width: 250 }} role="presentation" >
            <div className={styles.drawerLogo}>
                <img src={logo} alt="" />
                <FontAwesomeIcon icon={faXmark} onClick={toggleDrawer(false)} />
            </div>
            <List>
            {[
                { text: 'Dashboard', path: '/dashboard' },
                { text: 'Coding Playground', path: '/playground' },
                { text: 'Calendar', path: '/calendar' },
                { text: 'Announcements', path: '/announcements' },
                ...(user.role === 'teacher'
                    ? [{ text: 'Classes', path: '/teacher/classes' }]

                    : []),
                { text: 'Grades', path: (user.role === 'teacher' ? '/teacher/grades' : '/grades') }, 
            ].map((item) => (
                <ListItem key={item.text} disablePadding>
                    <ListItemButton 
                        className={`${tabName === item.path ? styles.active : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                    <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
                ))} 
            </List>
        </Box>
    );

    return (
        <div>
        <img onClick={toggleDrawer(true)} src={menu} alt="" />
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <div tabIndex={open ? 0 : -1}>
                {drawerContent}
            </div>
        </Drawer>
        </div>
    );
}
