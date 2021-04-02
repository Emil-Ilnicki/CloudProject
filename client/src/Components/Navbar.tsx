import React from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom"
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'; 
import HomeIcon from '@material-ui/icons/Home';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import CreateIcon from '@material-ui/icons/Create';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    toolbar: {
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

const PrivateNavbar = () => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Git Fit +
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Link to="/home">
          <List>
            <ListItem button>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText> Home </ListItemText>
            </ListItem>
          </List>
        </Link>
        <Link to="/home/edamamRecipes">
          <List>
            <ListItem button>
            <ListItemIcon><FastfoodIcon/></ListItemIcon>
            <ListItemText> Edamam Recipes </ListItemText>
            </ListItem>
          </List>
        </Link>
        <Link to="/home/addrecipes">
          <List>
            <ListItem button>
            <ListItemIcon><CreateIcon/></ListItemIcon>
            <ListItemText> Create Recipe </ListItemText>
            </ListItem>
          </List>
        </Link>
        <Link to="/home/getExercies">
          <List>
            <ListItem button>
            <ListItemIcon><AccessibilityNewIcon/></ListItemIcon>
            <ListItemText> Get Exercies </ListItemText>
            </ListItem>
          </List>
        </Link>

        <Divider />

        <Button 
          variant="danger"
          onClick={() => {
            Cookies.remove('x-auth-token')
            window.location.reload()
          }}
        >
          Log Out
        </Button>


      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

// {shouldShowNav ? null : (
//   <Navbar bg="success" variant="dark">
//   <Navbar.Brand>GitFit+</Navbar.Brand>
//   <Nav className="mr-auto">
//     <Nav.Link href="/home">Home</Nav.Link>
//     <Nav.Link href="/home/edamamRecipes">Edamam Recipes</Nav.Link>
//     <Nav.Link href="/home/addrecipes">Add a Recipe</Nav.Link>
//   </Nav>
//   <Form inline>
//   <Button
//       variant="danger"
//       onClick={() => {
//         Cookies.remove("x-auth-token");
//         window.location.reload(true);
//       }}
//     >
//       Log out
//     </Button>
//   </Form>
// </Navbar>
// )}

export default PrivateNavbar