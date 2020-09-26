import React from "react"
import clsx from "clsx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"

const useStylesChip = makeStyles(theme => ({
  root: {
    backgroundColor: "#007780",
    color: "#ffffff",
    "& .MuiChip-avatar": {
      color: "#ffffff",
    },
    cursor: "pointer",
  },
}))

export default function BlogPost({ data }) {
  const classesChip = useStylesChip()
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h3 className="primary-color mb-2">{post.frontmatter.title}</h3>
        <div className="pb-1">
          <Chip
            className={clsx(classesChip.root, "mt-2")}
            size="small"
            label={post?.frontmatter?.category}
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        category
      }
    }
  }
`