import React from "react"
import { Link } from "gatsby"
import Header from "./Header"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="news-layout">
        <Link to={`/`}>
          <h2 className="primary-color d-inline-block mb-2">Health News</h2>
        </Link>
        {/* <Divider /> */}
        {children}
      </div>
    </>
  )
}
