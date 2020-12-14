import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/css/style.scss"
import NewsWidget from "../components/HealthNews/NewsWidget"
import { Helmet } from "react-helmet"

export default function Home({ data }) {
  return (
    <Layout title="Articles And News">
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
        {/* <h4>{data.allMarkdownRemark.totalCount} Posts</h4> */}
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
