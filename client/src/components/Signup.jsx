import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import "../assets/styles/auth.css";
import next from "../assets/svg/next.svg";
import swiggle from "../assets/svg/swiggle.svg";
import { banks } from "../utils/seed";
import Lottie from "lottie-react";
import finger from "../assets/anime/finger.json";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      bank: "",
      accountNo: "",
      bvn: "",
      nin: "",
      step: 1,
      view: false,
      show: false,
      success: false,
      dashboard: false,
      tempErr: "",
      pop: false,
      vis: false,
    };
  }

  componentDidMount() {
    this.props.removeError();
    const query = window.location.search;
    if (query.includes("portfolio=mubarak")) {
      localStorage.setItem("wake", true);
      localStorage.setItem("portfolio", Date.now().toString());
      this.props.wake();
      this.setState({ pop: true });
      setTimeout(() => {
        this.setState({ vis: true });
      }, 500);
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      tempErr: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { step } = this.state;
    if (step === 3) {
      if (this.state.view === false) {
        this.setState({ view: true });
      }
      const authType = "register";
      const {
        email,
        password,
        pop,
        firstName,
        lastName,
        bank,
        nin,
        bvn,
        accountNo,
      } = this.state;

      this.props
        .onAuth(
          authType,
          {
            email,
            password,
            firstName,
            lastName,
            bank,
            accountNo,
            bvn,
            nin,
          },
          pop
        )
        .then(() => {
          this.setState({ dashboard: true });
        })
        .catch(() => {
          this.setState({ view: false });
          return;
        });
      if (!pop) {
      } else {
        setTimeout(() => {
          this.setState({ dashboard: true });
        }, 500);
      }
    } else {
      this.setState({ step: step + 1 });
    }
  };

  handleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  handleforgot = () => {
    this.props.forgot({ email: this.state.email }).then(() => {
      this.setState({
        success: true,
      });
    });
  };

  handleCancel = () => {
    this.setState({
      success: false,
    });
  };

  render() {
    const {
      email,
      tempErr,
      show,
      dashboard,
      pop,
      vis,
      step,
      firstName,
      lastName,
      bvn,
      nin,
      bank,
      accountNo,
    } = this.state;
    const { errors, reset } = this.props;

    return (
      <div className="auth-container">
        <div className="header">
          <img src="/assets/logo.png" alt="Haima Logo" />
          <Link to="/">
            <span>Home</span>
          </Link>
        </div>
        <h1>
          {step === 1
            ? "Create your Account"
            : step === 2
            ? "More details..."
            : "Get Started"}{" "}
          {step}/3
        </h1>
        <p className="subtext">
          Pay anywhere and anytime with our cutting-edge biometric payment
          solution.{" "}
        </p>
        {dashboard && <Navigate to="/" replace={true} />}
        <div className="inner-form reg">
          <form action="" onSubmit={this.handleSubmit}>
            {!errors.message ? (
              ""
            ) : (
              <div className="alert-danger">{errors.message}</div>
            )}
            {!tempErr ? "" : <div className="alert-danger">{tempErr}</div>}
            <div className="ins">
              <div className={`one ${step > 1 ? "back" : ""}`}>
                <div className="duo">
                  <div className="group">
                    <input
                      className={`${reset ? "hide" : ""}`}
                      id="firstName"
                      name="firstName"
                      onChange={this.handleChange}
                      value={firstName}
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="group">
                    <input
                      className={`${reset ? "reset" : ""}`}
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={this.handleChange}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="duo">
                  <div className="group">
                    <input
                      className={`${reset ? "hide" : ""}`}
                      id="email"
                      name="email"
                      onChange={this.handleChange}
                      value={email}
                      type="text"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="group">
                    <input
                      className={`${reset ? "reset" : ""}`}
                      id="password"
                      name="password"
                      onChange={this.handleChange}
                      type={`${show ? "text" : "password"}`}
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`one ${step > 2 ? "back" : step < 2 ? "next" : ""}`}
              >
                <div className="duo">
                  <div className="group">
                    <select
                      className={`${reset ? "hide" : ""}`}
                      id="bank"
                      name="bank"
                      onChange={this.handleChange}
                      value={bank}
                      type="text"
                    >
                      <option value={""} disabled selected>
                        Name of Bank
                      </option>
                      {banks.map((bk, i) => (
                        <option value={bk} key={i}>
                          {bk}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="group">
                    <input
                      className={`${reset ? "reset" : ""}`}
                      id="accountNo"
                      name="accountNo"
                      value={accountNo}
                      onChange={this.handleChange}
                      placeholder="Account Number"
                    />
                  </div>
                </div>
                <div className="duo">
                  <div className="group">
                    <input
                      className={`${reset ? "hide" : ""}`}
                      id="bvn"
                      name="bvn"
                      onChange={this.handleChange}
                      value={bvn}
                      type="text"
                      placeholder="BVN"
                    />
                  </div>
                  <div className="group">
                    <input
                      className={`${reset ? "reset" : ""}`}
                      id="nin"
                      name="nin"
                      value={nin}
                      onChange={this.handleChange}
                      placeholder="NIN"
                    />
                  </div>
                </div>
              </div>
              <div className={`one ${step < 3 ? "next" : ""}`}>
                <div className="anime">
                  <Lottie animationData={finger} />
                </div>
              </div>
            </div>

            <div className="links">
              {step > 1 && (
                <div
                  className={`btn`}
                  onClick={() => this.setState({ step: step - 1 })}
                >
                  <img src={next} alt="next img" />
                  <span>Back</span>
                </div>
              )}
              <button
                type="submit"
                className={`btn ${this.state.view ? "btn-load" : ""}`}
              >
                <span className="btn_text">
                  {step === 3 ? "Submit" : "Next"}
                </span>
                <img src={next} alt="next img" />
              </button>
            </div>
            <img src={swiggle} className="swiggle" alt="swiggle" />
            <p className="signup">
              <span>You have an account? </span>
              <a href="/signin">Sign In Now!</a>
            </p>
          </form>
        </div>
        <div className="policy">
          <p>Privacy Policy</p>
          <p>Tapit</p>
        </div>
      </div>
    );
  }
}
