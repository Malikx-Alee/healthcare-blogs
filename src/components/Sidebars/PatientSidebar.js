import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import SwipeableDrawer from "@material-ui/core/Drawer"
import Cookies from "js-cookie"
import { useHistory } from "react-router-dom"
import Avatar from "@material-ui/core/Avatar"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import HistoryIcon from "@material-ui/icons/History"
// import LockIcon from "@material-ui/icons/Lock";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard"
import SettingsIcon from "@material-ui/icons/Settings"
import GroupIcon from "@material-ui/icons/Group"
import ReceiptIcon from "@material-ui/icons/Receipt"
import SearchIcon from "@material-ui/icons/Search"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    top: "5.5rem",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      top: "4.5rem",
      paddingBottom: theme.spacing(10),
    },
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
      top: "5.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: 0,
      top: 58,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatarSizeSmall: {
    marginTop: 30,
    color: "#007780",
    backgroundColor: "rgba(0, 119, 128, 0.05)",
  },
  avatarSizeLarge: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    color: "#007780",
    backgroundColor: "rgba(0, 119, 128, 0.05)",
  },
  avatarHidden: {
    display: "none",
  },
  avatarRoot: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

export default function SwipeableDrawerMenu(props) {
  const classes = useStyles()
  let history = useHistory()

  let handleLogout = e => {
    e.preventDefault()
    Cookies.remove("auth_token")
    history.push("/")
    // window.location.reload();
  }

  let handleToggle = () => {
    if (window.innerWidth <= 760) {
      props.handleDrawerToggle()
    }
  }

  return (
    <div className={classes.root}>
      <SwipeableDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.openMenu,
          [classes.drawerClose]: !props.openMenu,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.openMenu,
            [classes.drawerClose]: !props.openMenu,
          }),
        }}
      >
        <div id="sidebar-menu" className={classes.drawerContainer}>
          <div className="profile-sidebar">
            <div className={classes.avatarRoot}>
              {props.userData.pictureURL !== undefined ? (
                <Avatar
                  src={`${process.env.REACT_APP_IMG_RESOURCE_URL}${props.userData.pictureURL}`}
                  className={clsx({
                    [classes.avatarHidden]: props.openMenu,
                    [classes.avatarSizeSmall]: !props.openMenu,
                  })}
                ></Avatar>
              ) : null}
            </div>
            <div
              className={clsx("widget-profile", "pro-widget-content", {
                [classes.avatarHidden]: !props.openMenu,
              })}
            >
              <div className="profile-info-widget">
                <div className="booking-doc-img">
                  <Avatar
                    src={`${process.env.REACT_APP_IMG_RESOURCE_URL}${props.userData.pictureURL}`}
                    className={clsx({
                      [classes.avatarSizeLarge]: props.openMenu,
                      [classes.avatarHidden]: !props.openMenu,
                    })}
                  ></Avatar>
                </div>

                <div className="profile-det-info">
                  <h3>{props.userData.name}</h3>
                </div>
              </div>
            </div>
            <div className="dashboard-widget">
              <nav className="dashboard-menu">
                <ul>
                  <li>
                    <a
                      href={`${process.env.REACT_APP_PATIENT_PORTAL_DOMAIN}/dashboard`}
                      onClick={handleToggle}
                    >
                      <DashboardIcon />
                      <span>Home</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${process.env.REACT_APP_PATIENT_PORTAL_DOMAIN}/dashboard/appointments`}
                      onClick={handleToggle}
                    >
                      <HistoryIcon />

                      <span>Appointments</span>
                    </a>
                  </li>
                  <li className="mobile-view-only">
                    <a
                      href={`${process.env.REACT_APP_MAIN_DOMAIN}/searchDoctor`}
                      onClick={handleToggle}
                    >
                      <SearchIcon />

                      <span>Search Doctor</span>
                    </a>
                  </li>
                  <li>
                    <a
                      to={`${process.env.REACT_APP_PATIENT_PORTAL_DOMAIN}/dashboard/medicalrecord`}
                      onClick={handleToggle}
                    >
                      <NoteAddIcon />
                      <span>Medical Record</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${process.env.REACT_APP_PATIENT_PORTAL_DOMAIN}/dashboard/dependents`}
                      onClick={handleToggle}
                    >
                      <GroupIcon />
                      <span>Dependents</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${process.env.REACT_APP_PATIENT_PORTAL_DOMAIN}/dashboard/labtests`}
                      onClick={handleToggle}
                    >
                      <ReceiptIcon />
                      <span>Lab Tests</span>
                    </a>
                  </li>
                  <li>
                    <a
                      to={`${process.env.REACT_APP_PATIENT_PORTAL_DOMAIN}/dashboard/profilesettings`}
                      onClick={handleToggle}
                    >
                      <SettingsIcon />
                      <span>Profile Settings</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  )
}
