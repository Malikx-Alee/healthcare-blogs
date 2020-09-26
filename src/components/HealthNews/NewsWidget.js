import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { Link } from "gatsby"

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

function NewsWidget(props) {
  const classesChip = useStylesChip()
  return (
    <div className="card p-4 my-2">
      <Link className="news-link" to={props.news?.fields?.slug}>
        <div className="d-flex flex-row-reverse">
          <div className="ml-2 mr-0">
            <div className="news-widget-img-div">
              <img
                alt="News"
                // src={`../../../content/avatar.jpg`}
                src="https://demo.tagdiv.com/newspaper_covid19_news_pro/wp-content/uploads/2020/03/9-1068x601.jpg"
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="news-widget-title">
              <h3 className="primary-color">
                {props.news?.frontmatter?.title}
              </h3>
            </div>

            <div className="pb-1">
              <Chip
                className={clsx(classesChip.root, "mt-2")}
                size="small"
                label={props.news?.frontmatter?.category}
              />
            </div>
            <div className="news-widget-title">
              <p className="primary-color">{props.news?.excerpt}</p>
            </div>

            <div>
              <span className="news-widget-dateTime">
                {props.news?.frontmatter?.date}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NewsWidget
