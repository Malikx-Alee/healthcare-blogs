import React, { useEffect, useState } from "react"
import clsx from "clsx"
import axios from "axios"
import logo from "../../assets/img/logo.png"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Avatar from "@material-ui/core/Avatar"
import { useHistory } from "react-router-dom"
import PatientSidebar from "../Sidebars/PatientSidebar"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { Divider } from "@material-ui/core"
import LockIcon from "@material-ui/icons/Lock"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Cookies from "js-cookie"
import HeaderAlerts from "../general/HeaderAlerts"

const drawerWidth = 280
const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "#ffffff",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    backgroundColor: "#ffffff",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // zIndex: theme.zIndex.drawer + 1,
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: "#007780",
  },
  appBarItems: {
    marginRight: 20,
  },
  title: {
    flexGrow: 1,
  },
  avatarRoot: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    color: "#007780",
    backgroundColor: "rgba(0, 119, 128, 0.05)",
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  hidden: {
    display: "none",
  },
  img: {
    height: 40,
    [theme.breakpoints.down("sm")]: {
      height: 30,
    },
  },
}))

export default function HeaderMenuAppBar(props) {
  let history = useHistory()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  let [openAvatarMenu, setOpenAvatarMenu] = useState(false)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
    handleMenu()
  }
  const handleMenu = () => {
    setOpenAvatarMenu(true)
  }

  const handleClose = () => {
    setOpenAvatarMenu(false)
  }

  const handleDrawerToggle = () => {
    props.setOpenMenu(!props.openMenu)
  }
  const handleDrawerClose = () => {
    props.setOpenMenu(false)
  }

  let handleLogout = e => {
    e.preventDefault()
    Cookies.remove("auth_token")
    Cookies.remove("Clinic")
    props.logoutRequest()
  }

  let [searchLocation, setSearchLocation] = useState("")
  useEffect(() => {
    let city = Cookies.get("city")
    if (city) setSearchLocation(city)
  }, [])

  return (
    <>
      <div className={clsx(classes.root, "mb-5")}>
        {/* <CssBaseline /> */}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={clsx(classes.menuButton)}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <div className={clsx(classes.appBarItems)}>
              <a href={"/"}>
                <img
                  src={logo}
                  alt={"Ez Doc"}
                  className={clsx(classes.img, "pointer-div")}
                />
              </a>
            </div>
            <div className={classes.title}>
              <a
                href={`${process.env.REACT_APP_MAIN_DOMAIN}/searchDoctor/${searchLocation}`}
              >
                <p
                  className={clsx(
                    "header-new-nav",
                    "desktop-view-only",
                    "pointer-div"
                  )}
                >
                  Search Doctors
                </p>
              </a>
            </div>
            <div>
              <div className={classes.avatarRoot}>
                {props.userData !== undefined ? (
                  <Avatar
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    className={classes.avatar}
                    src={`${process.env.REACT_APP_IMG_RESOURCE_URL}${props.userData.pictureURL}`}
                    onClick={handleClick}
                  ></Avatar>
                ) : null}
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={openAvatarMenu}
                onClose={handleClose}
              >
                <Divider />
                <MenuItem onClick={handleClose}>
                  <a
                    to={`${process.env.REACT_APP_PATIENT_PORTAL_DOMAIN}/dashboard/changepassword`}
                    className="w-100"
                  >
                    <LockIcon className="primary-color" fontSize="small" />{" "}
                    <span className="primary-color">Change Password</span>
                  </a>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <a to={`/`} onClick={handleLogout} className="w-100">
                    <ExitToAppIcon className="primary-color" fontSize="small" />{" "}
                    <span className="primary-color">Logout</span>
                  </a>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>

          <HeaderAlerts userAlert={props.userAlert} />
        </AppBar>
      </div>
      <PatientSidebar
        match={props.match}
        userData={props.userData}
        openMenu={props.openMenu}
        handleDrawerToggle={handleDrawerClose}
      />
    </>
  )
}
