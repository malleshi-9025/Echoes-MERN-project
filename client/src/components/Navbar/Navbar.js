import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar, AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
// import memories from '../../images/memories.png';
import echoesLogo from '../../images/echoes-Logo.png'
import echoesText from '../../images/echoes-Text.png'

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);
    };

    // useEffect will set the user when location changes, i.e. '/auth' to '/' or vice-vers
    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            // if token expired log the user out
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
            
        setUser(JSON.parse(localStorage.getItem('profile')));
        
    }, [location]);

    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
            <img src={echoesText} alt="icon" height="50px" />
            <img className={classes.image} src={echoesLogo} alt="icon" height="45px" />
        </Link>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography className={classes.userName} variant="h6">
                        {user.result.name}
                    </Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                        Log Out
                    </Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">
                    Sign In
                </Button>
            )}
        </Toolbar>
    </AppBar>
    )
}

export default Navbar;