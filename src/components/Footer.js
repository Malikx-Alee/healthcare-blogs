import React from "react"
import footerLogo from "../assets/img/logo-white.svg"
// import RoomIcon from "@material-ui/icons/Room";
// import EmailIcon from "@material-ui/icons/Email";
// import PhoneIcon from "@material-ui/icons/Phone";

function Footer() {
  return (
    <footer className="footer">
      {/* <!-- Footer Top --> */}
      <div className="footer-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              {/* <!-- Footer Widget --> */}
              <div className="footer-widget footer-about">
                <div className="footer-logo">
                  <img src={footerLogo} alt="logo" />
                </div>
                <div className="footer-about-content">
                  <p>
                    ezDOC provides a platorm to connect patients with physicians
                    in a easy and natural way. Patients can search physician
                    based on speciality, name, hospital, or area and instanlty
                    book an appointment{" "}
                  </p>
                  <div className="social-icon">
                    <ul>
                      <li>
                        <a href="index.html" target="_blank">
                          <i className="fab fa-facebook-f"></i>{" "}
                        </a>
                      </li>
                      <li>
                        <a href="index.html" target="_blank">
                          <i className="fab fa-twitter"></i>{" "}
                        </a>
                      </li>
                      <li>
                        <a href="index.html" target="_blank">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a href="index.html" target="_blank">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- /Footer Widget --> */}
            </div>

            <div className="col-lg-3 col-md-6">
              {/* <!-- Footer Widget --> */}
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">For Patients</h2>
                <ul>
                  <li>
                    <a href="https://ezdoc.pk/searchDoctor/Lahore">
                      <i className="fas fa-angle-double-right"></i> Search
                      Doctors in Lahore
                    </a>
                  </li>
                  <li>
                    <a href="https://ezdoc.pk/searchDoctor/Islamabad">
                      <i className="fas fa-angle-double-right"></i> Search
                      Doctors in Islamabad
                    </a>
                  </li>
                  <li>
                    <a href="https://ezdoc.pk/searchDoctor/Rawalpindi">
                      <i className="fas fa-angle-double-right"></i> Search
                      Doctors in Rawalpindi
                    </a>
                  </li>
                  <li>
                    <a href="https://blogs.ezdoc.pk/bmi">
                      <i className="fas fa-angle-double-right"></i> Calculate
                      Body Mass Index
                    </a>
                  </li>
                  <li>
                    <a href="https://blogs.ezdoc.pk/bmr">
                      <i className="fas fa-angle-double-right"></i> Calculate
                      Body Metabolic Rate
                    </a>
                  </li>
                  <li>
                    <a href="https://ezdoc.pk/login">
                      <i className="fas fa-angle-double-right"></i> Login
                    </a>
                  </li>
                  <li>
                    <a href="https://ezdoc.pk/register">
                      <i className="fas fa-angle-double-right"></i> Register
                    </a>
                  </li>
                  <li>
                    <a href="https://blogs.ezdoc.pk/news/">
                      <i className="fas fa-angle-double-right"></i> News
                    </a>
                  </li>
                  <li>
                    <a href="https://blogs.ezdoc.pk/articles/">
                      <i className="fas fa-angle-double-right"></i> Articles
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- /Footer Widget --> */}
            </div>

            <div className="col-lg-3 col-md-6">
              {/* <!-- Footer Widget --> */}
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">For Physicians</h2>
                <ul>
                  <li>
                    <a href="https://ezdoc.pk/physician">
                      <i className="fas fa-angle-double-right"></i> Login
                    </a>
                  </li>
                  <li>
                    <a href="https://ezdoc.pk/registerphysician">
                      <i className="fas fa-angle-double-right"></i> Apply for
                      Registration
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- /Footer Widget --> */}
            </div>

            <div className="col-lg-3 col-md-6">
              {/* <!-- Footer Widget --> */}
              <div className="footer-widget footer-contact">
                <h2 className="footer-title">Contact Us</h2>

                <div className="footer-contact-info white-color">
                  <p className="white-color">
                    {" "}
                    EZDOC SOLUTIONS (PRIVATE) LIMITED
                  </p>
                  <div className="footer-address">
                    <p className="white-color">
                      {" "}
                      89 Temple Road Lahore Pakistan{" "}
                    </p>
                  </div>
                  <p className="white-color">+92 305 788 8821</p>
                  <p className="white-color">+92 336 497 7817</p>
                  <p className="mb-0 white-color">contact@ezdoc.pk</p>
                </div>
              </div>
              {/* <!-- /Foote/r Widget --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Footer Top --> */}

      {/* <!-- Footer Bottom --> */}
      <div className="footer-bottom">
        <div className="container-fluid">
          {/* <!-- Copyright --> */}
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <div className="copyright-text">
                  <p className="mb-0">
                    &copy; 2021 EZDOC SOLUTIONS (PRIVATE) LIMITED. All rights
                    reserved.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                {/* <!-- Copyright Menu --> */}
                <div className="copyright-menu">
                  <ul className="policy-menu">
                    <li>
                      <a href="https://ezdoc.pk/terms-and-conditions">
                        Terms and Conditions
                      </a>
                    </li>
                    <li>
                      <a href="https://ezdoc.pk/privacy-policy">Policy</a>
                    </li>
                  </ul>
                </div>
                {/* <!-- /Copyright Menu --> */}
              </div>
            </div>
          </div>
          {/* <!-- /Copyright --> */}
        </div>
      </div>
      {/* <!-- /Footer Bottom --> */}
    </footer>
  )
}

export default Footer
