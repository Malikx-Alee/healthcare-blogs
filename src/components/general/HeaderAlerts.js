import React from "react"
import SettingsIcon from "@material-ui/icons/Settings"
import { Link } from "react-router-dom"

function HeaderAlerts(props) {
  return (
    <>
      <div className="row patient-header-bar justify-content-center">
        {props.userAlert ? (
          <>
            {props.userAlert.icon === "settings" ? (
              <SettingsIcon
                className="mr-2 align-self-center"
                fontSize="small"
              />
            ) : null}
            <p className="white-color mr-2 align-self-center">
              {props.userAlert.message}
            </p>
            <a
              className="white-color mr-4 align-self-center"
              to={props.userAlert.linkToPage}
            >
              Click Here
            </a>
          </>
        ) : null}
      </div>
    </>
  )
}

export default HeaderAlerts
