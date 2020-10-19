import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/css/style.scss"
import NewsWidget from "../components/HealthNews/NewsWidget"

export default function Home({ data }) {
  return (
    <Layout title="Health News">
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "news" } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            category
            featuredImage
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
