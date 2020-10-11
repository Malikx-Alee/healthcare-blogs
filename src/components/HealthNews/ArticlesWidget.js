import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { Link } from "gatsby"
import { Avatar } from "@material-ui/core"

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
}))

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

function ArticlesWidget(props) {
  const classes = useStyles()
  const classesChip = useStylesChip()
  return (
    <div className="card news-card">
      <Link className="news-link" to={props.news?.fields?.slug}>
        <div className="d-flex flex-row">
          <div className="news-flex">
            <div className="news-widget-img-div">
              <img
                alt="News"
                // src={`../../../content/avatar.jpg`}
                src="https://demo.tagdiv.com/newspaper_covid19_news_pro/wp-content/uploads/2020/03/9-1068x601.jpg"
              />
            </div>
          </div>
          <div className="news-details-flex">
            <div className="pb-1">
              <Chip
                className={clsx(classesChip.root, "mt-2")}
                size="small"
                label={props.news?.frontmatter?.category}
              />
            </div>
            <div className="news-widget-title">
              <h3 className="primary-color">
                {props.news?.frontmatter?.title}
              </h3>
            </div>

            <div className="news-widget-title news-excerpt">
              <p className="primary-color">{props.news?.excerpt}</p>
            </div>
            <div className="news-date">
              <div className={clsx(classes.avatarRoot, "align-self-center")}>
                <Avatar className={classes.avatar} />{" "}
                <span className="primary-color align-self-center">
                  {props.news?.frontmatter?.author}
                </span>
              </div>
              <span className="news-widget-dateTime float-right align-self-center">
                {props.news?.frontmatter?.date}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ArticlesWidget
