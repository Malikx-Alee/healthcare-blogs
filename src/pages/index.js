import React, { useState, useEffect } from "react"
import axios from "axios"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/css/style.scss"
import NewsWidget from "../components/HealthNews/NewsWidget"
import { Helmet } from "react-helmet"

export default function Home({ data }) {
  let [user, setUser] = useState({})
  let [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")
  let checkLoginStatusNew = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_SERVER_ADDRESS}/api/v1/auth/logged_in`,
        {
          withCredentials: true,
        }
      )
      .then(response => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setUser(response.data.user)
          setLoggedInStatus("LOGGED_IN")
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN")
          setUser({})
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  let logoutRequest = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_SERVER_ADDRESS}/api/v1/auth/logout`,
        {
          withCredentials: true,
        }
      )
      .then(response => {
        setLoggedInStatus("NOT_LOGGED_IN")
        setUser({})
        // router.push("/")
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    checkLoginStatusNew()
  }, [])

  return (
    <Layout
      title="Articles And News"
      loggedInStatus={loggedInStatus}
      user={user}
      logoutRequest={logoutRequest}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta property="og:title" content="EzDoc Healthcare Blogs" />
        <meta property="og:image" content="logo192.png" />
        <meta
          property="og:description"
          content="Healthcare Blogs to provide awarness"
        />
        <title>EzDoc Healthcare Blogs</title>
      </Helmet>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <NewsWidget news={node} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            category
            featureImage {
              childImageSharp {
                fluid(maxWidth: 400, maxHeight: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
