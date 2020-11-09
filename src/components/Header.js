import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar } from "@material-ui/core"
import logo from "../assets/img/logo.png"
import { Navbar, Nav } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "#ffffff",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <AppBar position="static" className={clsx(classes.appBar)}>
          <Navbar collapseOnSelect expand="lg" className="header-background">
            <Navbar.Brand href="/">
              <img
                src={logo}
                alt={"Ez Doc"}
                className={clsx(classes.img, "mb-0")}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="https://ezdoc.pk">
                  <p className="header-new-nav primary-color">HOME </p>
                </Nav.Link>
                <Nav.Link href="https://ezdoc.pk/registerphysician">
                  <p className="header-new-nav">REGISTER PHYSICIAN </p>
                </Nav.Link>
                <Nav.Link href="https://blogs.ezdoc.pk/news">
                  <p className="header-new-nav">NEWS </p>
                </Nav.Link>
                <Nav.Link href="https://blogs.ezdoc.pk/articles">
                  <p className="header-new-nav">ARTICLES </p>
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="https://ezdoc.pk/register">
                  <p className="header-login-signup"> SIGN UP </p>
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="https://ezdoc.pk/login">
                  <p className="header-login-signup"> SIGN IN </p>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </AppBar>
      </div>
    </>
  )
}
