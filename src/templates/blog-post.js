import React, { useState, useEffect } from "react"
import clsx from "clsx"
import axios from "axios"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { Avatar } from "@material-ui/core"
import ShareButtons from "../components/ShareButtons/sharebuttons"

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

export default function BlogPost(props) {
  const classes = useStyles()
  const classesChip = useStylesChip()

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

  const post = props.data.markdownRemark

  const title = `Read ${props.data.markdownRemark.frontmatter.title} `
  const url = props.location.href
  return (
    <Layout
      loggedInStatus={loggedInStatus}
      user={user}
      logoutRequest={logoutRequest}
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

        <ShareButtons title={title} url={url} />

        {post?.frontmatter?.author ? (
          <>
            <br />
            <hr />
            <br />

            <div className="row no-gutters">
              <Avatar
                className={classes.avatarBio}
                src={
                  post?.frontmatter?.author?.image?.childImageSharp?.fluid.src
                }
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
          </>
        ) : null}
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
