import { Box, AppBar, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem, ListItemIcon } from '@mui/material';
import ThemeSwitcher from "../Components/ThemeSwitcher";
import { useState } from "react";
import { useSelector } from 'react-redux';
import DynamicIcon from '../Components/DynamicIcon';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    const configurationData = useSelector(state => state.configurationData);
    const [menuMobileNavigation, setMenuMobileNavigation] = useState(null);
    const navigate = useNavigate();

    const title = configurationData.title;
    const header = configurationData.header;
    const pages = header.pages;

    const handleOpenMobileMenu = (event) => {
        setMenuMobileNavigation(event.currentTarget);
    };

    const handleCloseMobileMenu = (e) => {
        e.currentTarget.name && navigate(e.currentTarget.name); // name of path
        setMenuMobileNavigation(null);
    };

    return <AppBar position="static" color="inherit">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Tooltip title={title}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                            {title}
                        </Link>
                    </Typography>
                </Tooltip>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenMobileMenu}
                        color="inherit"
                    >
                        <DynamicIcon iconName="Menu" />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={menuMobileNavigation}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(menuMobileNavigation)}
                        onClose={handleCloseMobileMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <Tooltip key={page.value} title={page.value}>
                                <Link to={page.path} key={page.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <MenuItem onClick={handleCloseMobileMenu}>
                                        <ListItemIcon>
                                            <DynamicIcon key={page.icon} iconName={page.icon} />
                                        </ListItemIcon>
                                        <Typography textAlign="center">{page.value}</Typography>
                                    </MenuItem>
                                </Link>
                            </Tooltip>
                        ))}
                    </Menu>
                </Box>
                <Tooltip title={title}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                            {title}
                        </Link>
                    </Typography>
                </Tooltip>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Tooltip key={page.value} title={page.value}>
                            <Button
                                key={page}
                                name={page.path}
                                onClick={handleCloseMobileMenu}
                                sx={{ my: 2, p: 1.5, ml: 1, color: 'inherit' }}
                                startIcon={<DynamicIcon iconName={page.icon} key={page.icon} />}
                            >
                                {page.value}
                            </Button>
                        </Tooltip>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <ThemeSwitcher />
                </Box>
            </Toolbar>
        </Container>
    </AppBar >
}

export default Header;