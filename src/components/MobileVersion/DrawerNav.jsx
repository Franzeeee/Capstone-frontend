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
import { faBars, faBullhorn, faCalendar, faChalkboardTeacher, faCode, faDashboard, faHome, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
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
                <img src={logo} onClick={() => navigate('/dashboard')} alt="" />
                <FontAwesomeIcon icon={faXmark}onClick={toggleDrawer(false)} />
            </div>
            <List>
            {[
                { text: 'Dashboard', path: '/dashboard', icon: user.role === 'teacher' ? faBars : faHome },
                { text: 'Coding Playground', path: '/playground', icon: faCode },
                { text: 'Calendar', path: '/calendar', icon: faCalendar },
                { text: 'Announcements', path: '/announcements', icon: faBullhorn },
                ...(user.role === 'teacher'
                    ? [{ text: 'Classes', path: '/teacher/classes', icon: faChalkboardTeacher }]

                    : []),
                { text: 'Grades', path: (user.role === 'teacher' ? '/teacher/grades/class' : '/grades'), icon: faStar }, 
            ].map((item) => (
                <ListItem key={item.text} disablePadding>
                    <ListItemButton 
                        className={`${tabName === item.path ? styles.active : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                    <FontAwesomeIcon icon={item.icon || faHome} style={{marginRight: '5px'}} />
                    <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
                ))} 
            </List>
        </Box>
    );

    return (
        <div>
        <img className={styles.menuIcon} onClick={toggleDrawer(true)} src={menu} alt="" />
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <div tabIndex={open ? 0 : -1}>
                {drawerContent}
            </div>
        </Drawer>
        </div>
    );
}
