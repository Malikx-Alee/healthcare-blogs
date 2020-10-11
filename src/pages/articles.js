import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/css/style.scss"
import ArticlesWidget from "../components/HealthNews/ArticlesWidget"

export default function Home({ data }) {
  return (
    <Layout title="Health Articles">
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
      filter: { frontmatter: { type: { eq: "articles" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            category
            author
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
