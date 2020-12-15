import React from "react"
import clsx from "clsx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { Avatar } from "@material-ui/core"

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

const useStyles = makeStyles(theme => ({
  avatarRoot: {
    display: "flex",
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  avatar: {
    color: "#007780",
    backgroundColor: "rgba(0, 119, 128, 0.05)",
    // [theme.breakpoints.down("sm")]: {
    //   width: theme.spacing(4),
    //   height: theme.spacing(4),
    // },
  },
  avatarBio: {
    color: "#007780",
    backgroundColor: "rgba(0, 119, 128, 0.05)",
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  },
}))

export default function BlogPost({ data }) {
  const classes = useStyles()
  const classesChip = useStylesChip()
  const post = data.markdownRemark
  return (
    <Layout
      title={
        post.frontmatter.type === "news" ? "Health News" : "Health Articles"
      }
      redirectTo={post.frontmatter.type}
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={post.frontmatter.featureImage?.childImageSharp.fluid?.src}
      />

      <div>
        <h3 className="primary-color mb-2">{post.frontmatter.title}</h3>
        {post?.frontmatter.type === "articles" ? (
          <div className="row no-gutters">
            <Avatar
              className={classes.avatar}
              src={post?.frontmatter?.author?.image?.childImageSharp?.fluid.src}
            />{" "}
            <span className="ml-3 primary-color align-self-center">
              {post?.frontmatter?.author?.name}
            </span>
          </div>
        ) : null}
        <div className="pb-1">
          <Chip
            className={clsx(classesChip.root, "mt-2")}
            size="small"
            label={post?.frontmatter?.category}
          />
        </div>
        <br />
        {post.frontmatter && (
          <Img
            fluid={post?.frontmatter?.featureImage?.childImageSharp?.fluid}
          />
        )}
        <br />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <br />
        <hr />
        <br />
        <div className="row no-gutters">
          <Avatar
            className={classes.avatarBio}
            src={post?.frontmatter?.author?.image?.childImageSharp?.fluid.src}
          />{" "}
          <div className="col">
            <h4 className="ml-3 primary-color align-self-center">
              {post?.frontmatter?.author?.name} - Author
            </h4>
            <p className="ml-3 primary-color align-self-center">
              {post?.frontmatter?.author?.bio}
            </p>
          </div>
        </div>
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
        type
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
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      excerpt
    }
  }
`
