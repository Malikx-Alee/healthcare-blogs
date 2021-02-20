import React, { useEffect, useState } from "react"
import axios from "axios"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import "bootstrap/dist/css/bootstrap.min.css"
import "../../assets/css/style.scss"
import ArticlesWidget from "../../components/HealthNews/ArticlesWidget"
import SEO from "../../components/seo"

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
      title="Health Articles"
      loggedInStatus={loggedInStatus}
      user={user}
      logoutRequest={logoutRequest}
    >
      <SEO title="Health Articles" />
      <div>
        {/* <h4>{data.allMarkdownRemark.totalCount} Posts</h4> */}
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <ArticlesWidget news={node} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "articles" } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            category
            author {
              id
              name
              bio
              image {
                childImageSharp {
                  fluid(maxWidth: 200, quality: 100, maxHeight: 200) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            featureImage {
              childImageSharp {
                fluid(maxWidth: 800, quality: 100, maxHeight: 400) {
                  ...GatsbyImageSharpFluid_tracedSVG
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
