import React from "react"
import { Link } from "gatsby"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children, title, redirectTo }) {
  return (
    <>
      <Header />
      <div className="news-layout">
        <Link to={redirectTo ? `/${redirectTo}` : null}>
          <h2 className="primary-color d-inline-block mb-2">{title}</h2>
        </Link>
        {/* <Divider /> */}
        {children}
      </div>
      <Footer />
    </>
  )
}
