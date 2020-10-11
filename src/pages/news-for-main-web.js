import React from "react"
import clsx from "clsx"
import { graphql, Link } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/css/style.scss"
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

export default function Home({ data }) {
  const classesChip = useStylesChip()
  return (
    <div>
      <div className="row d-flex ">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div
            className="col-xs-12 col-sm-6 col-md-6 col-lg-3 home-news-div my-2"
            key={node.id}
          >
            <Link
              target="_blank"
              rel="noreferrer"
              className="news-link"
              to={node?.fields?.slug}
            >
              <div>
                <img
                  alt="news"
                  // src={`${process.env.REACT_APP_IMG_RESOURCE_URL}${i.pictureURL}`}
                  src="https://demo.tagdiv.com/newspaper_covid19_news_pro/wp-content/uploads/2020/03/9-1068x601.jpg"
                  width="100%"
                  className="health-news-img"
                />
              </div>
              <div>
                <Chip
                  className={clsx(classesChip.root, "mt-2")}
                  size="small"
                  label={node?.frontmatter?.category}
                />
              </div>
              <p className="health-news-title mt-2 mb-1">
                {node?.frontmatter?.title}
              </p>
              <span className="news-widget-dateTime">
                {node?.frontmatter?.date}
              </span>
            </Link>
          </div>
        ))}
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
          <div className="row home-more-news-div">
            <div className="col-12 align-self-center justify-content-center text-center">
              <a href="https://blogs.ezdoc.pk/" target="_blank" rel="noreferrer">
                <h3 className="primary-color">View More</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "news" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            category
            type
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
