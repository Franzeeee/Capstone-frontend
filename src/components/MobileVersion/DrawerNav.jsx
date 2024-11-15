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

export default function DrawerNav() {
    const [open, setOpen] = React.useState(false);

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
            {['Dashboard', 'Coding Playgound', 'Calendar', 'Announcements', 'Classes', 'Grades'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider />
        </Box>
    );

    return (
        <div>
        <img onClick={toggleDrawer(true)} src={menu} alt="" />
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {drawerContent}
        </Drawer>
        </div>
    );
}
