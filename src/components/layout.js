import React from "react"
import clsx from "clsx"
import { Link } from "gatsby"
import UserHeader from "./Headers/UserHeader"
import Header from "./Header"
import Footer from "./Footer"
import { propTypes } from "react-bootstrap/esm/Image"

export default function Layout({
  children,
  title,
  redirectTo,
  user,
  loggedInStatus,
  logoutRequest,
}) {
  const [openMenu, setOpenMenu] = React.useState(false)
  return (
    <>
      {loggedInStatus === "LOGGED_IN" ? (
        <>
          {user ? (
            <UserHeader
              userData={user}
              logoutRequest={logoutRequest}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          ) : (
            <Header />
          )}
        </>
      ) : (
        <Header />
      )}
      <div className="news-layout">
        <Link to={redirectTo ? `/${redirectTo}` : null}>
          <h2
            className={clsx("primary-color d-inline-block mb-2", {
              "mt-5": user?.role != undefined ? true : false,
            })}
          >
            {title}
          </h2>
        </Link>

        {children}
      </div>
      <div
        className={clsx({
          "footer-user": user?.role !== undefined ? true : false,
          "footer-user-menu":
            user?.role !== undefined && openMenu ? true : false,
        })}
      >
        <Footer />
      </div>
    </>
  )
}
