import React, { useState, useEffect } from "react"
import clsx from "clsx"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Helmet } from "react-helmet"
// import ReactGA from "react-ga";
// import ErrorBoundary from "../components/ErrorHanlder/ErrorBoundary";
// import bmiScaleImg from "../assets/img/bmi-scale.png";
import heightMeasure from "../../assets/img/healthCondition/height_128.png"
import weightMeasure from "../../assets/img/healthCondition/weight_128.png"
import ageImg from "../../assets/img/healthCondition/age_128.png"
import { Modal, Spinner } from "react-bootstrap"
import moment from "moment"

function BMRScreen(props) {
  let history = useHistory()

  let [user, setUser] = useState({})
  let [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")
  let checkLoginStatusNew = () => {
    axios
      .get(`https://backend.ezdoc.pk/api/v1/auth/logged_in`, {
        withCredentials: true,
      })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setUser(response.data.user)
          setLoggedInStatus("LOGGED_IN")
          history.push({
            pathname: "https://ezdoc.pk/dashboard/medicalrecord",
            state: {
              activeTab: "healthCondition",
            },
          })
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN")
          setUser({})
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  let [name, setName] = useState("")
  let [mobile, setMobile] = useState("")

  let [bmr, setBMR] = useState()
  let [BMRtext, setBMRtext] = useState("You are Overweight")

  let [heightFeet, setHeightFeet] = useState()
  let [heightInches, setHeightInches] = useState()
  let [weight, setWeight] = useState()
  let [age, setAge] = useState()
  let [gender, setGender] = useState("")

  useEffect(() => {
    checkLoginStatusNew()

    window.scrollTo(0, 0)
  }, [])

  let [askDetailModal, setAskDetailModal] = useState(false)
  let handleShowAskDetail = () => setAskDetailModal(true)
  let handleCloseAskDetail = () => setAskDetailModal(false)

  let [askDetails, setAskDetails] = useState(false)
  let handleCalculateBMR = () => {
    if (askDetails) {
      setBMRtext("Calories/day")
      let feetToinches = heightFeet * 12 + heightInches

      if (gender === "Male") {
        let value = 10 * weight + 6.25 * (feetToinches * 2.54) - 5 * age + 5
        setBMR(Math.trunc(value))
      } else {
        let value = 10 * weight + 6.25 * (feetToinches * 2.54) - 5 * age - 161
        setBMR(Math.trunc(value))
      }

      window.scrollTo(0, 0)
    } else {
      handleShowAskDetail()
    }
  }

  let [isSubmitting, setIsSubmitting] = useState(false)
  let handleSubmitDetails = () => {
    setAskDetails(true)
    setIsSubmitting(true)
    setAskDetailModal(false)
    setIsSubmitting(false)
    handleCalculateBMR()
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Calculate Body Metabolic Rate | EZDOC</title>
      </Helmet>

      <Header />

      {/* <ErrorBoundary> */}
      <div className="container">
        <div className="content">
          <h1 className="primary-color text-center">
            <strong>Calculate Body Metabolic Rate</strong>
          </h1>

          <div>
            <div className="row no-gutters mt-5">
              <div className="p-3 col-12 col-md-6">
                <h4>Body Metabolic Rate (BMR)</h4>

                {bmr ? (
                  <div className="mt-3 bmi-result-div ">
                    <div className="row mt-4 justify-content-center align-content-center">
                      <p className="bmi-result-text text-center white-color">
                        <strong className="bmi-result-number"> {bmr} </strong>
                        <br />
                        {BMRtext}
                      </p>
                    </div>

                    <br />
                  </div>
                ) : null}

                <br />
                <div className="bmi-details">
                  The basal metabolic rate (BMR) is the amount of energy needed
                  while resting in a temperate environment when the digestive
                  system is inactive.
                </div>
                <br />

                <div className="row no-gutters">
                  <div className="col-12">
                    <h4>Factors Considered in BMR</h4>
                  </div>
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div className="bmi-measure">
                        <div className="row justify-content-center align-content-center">
                          <img
                            alt="Age"
                            className="bmi-measure-img align-self-center"
                            src={ageImg}
                          />
                          <div className="bmi-measure-text text-center">
                            <p className="secondary-color mb-0">{age}</p>
                            <p>Years</p>
                          </div>
                        </div>
                      </div>
                      <div className="bmi-measure ">
                        <div className="row justify-content-center align-content-center">
                          <img
                            alt="BMI Weight"
                            className="bmi-measure-img align-self-center"
                            src={weightMeasure}
                          />
                          <div className="bmi-measure-text text-center">
                            <p className="secondary-color mb-0">{weight}</p>
                            <p>Kgs</p>
                          </div>
                        </div>
                      </div>
                      <div className="bmi-measure ">
                        <div className="row justify-content-center align-content-center">
                          <img
                            alt="BMI Height"
                            className="bmi-measure-img align-self-center"
                            src={heightMeasure}
                          />
                          <div className="bmi-measure-text text-center">
                            <p className="secondary-color mb-0">
                              {heightFeet}
                              {heightFeet ? "'" : null}
                              {heightInches}
                              {heightInches ? "''" : null}
                            </p>
                            <p>feet</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 col-12 col-md-6">
                <h4 className="primary-color">Enter Information</h4>
                <div className="mt-3">
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      handleCalculateBMR()
                    }}
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>Gender</label>
                          <select
                            required
                            className="form-control"
                            onChange={e => setGender(e.target.value)}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Age</label>
                          <input
                            type="number"
                            placeholder="e.g. 18"
                            className="form-control"
                            defaultValue={age}
                            onChange={e => {
                              setAge(e.target.value)
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12  col-md-6">
                        <div className="form-group">
                          <label>Weight (Kg)</label>
                          <input
                            type="Number"
                            placeholder="e.g. 58"
                            className="form-control"
                            defaultValue={weight}
                            onChange={e => {
                              setWeight(e.target.value)
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label>Height</label>
                          <div className="row no-gutters">
                            <div className="col-6 pl-0">
                              <label>Feet</label>
                              <select
                                className="form-control"
                                defaultValue={heightFeet}
                                onChange={e => {
                                  setHeightFeet(parseInt(e.target.value))
                                }}
                                required
                              >
                                <option value="">Feet</option>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                              </select>
                            </div>
                            <div className="col-6 pr-0">
                              <label>Inches</label>
                              <select
                                className="form-control"
                                defaultValue={heightInches}
                                onChange={e => {
                                  setHeightInches(parseInt(e.target.value))
                                }}
                                required
                              >
                                <option value="">Inches</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <button className="btn btn-background">
                        Calculate My BMR
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={askDetailModal} onHide={handleCloseAskDetail} centered>
          <Modal.Header closeButton>
            <Modal.Title>Please Enter Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSubmitDetails()
              }}
            >
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="Number"
                      placeholder="03XXXXXXXXX"
                      className="form-control"
                      pattern="03[0-9]{9}"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-background"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner animation="border" role="status" size="sm">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : null}{" "}
                  Submit
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      {/* </ErrorBoundary> */}
      <Footer />
    </>
  )
}

export default BMRScreen
