import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import "../assets/styles/auth.css";
import next from "../assets/svg/next.svg";
import swiggle from "../assets/svg/swiggle.svg";

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    if (this.state.view === false) {
      this.setState({ view: true });
    }
    const authType = this.props.signUp ? "register" : "login";
    const { email, password, pop } = this.state;

    this.props
      .onAuth(
        authType,
        {
          email,
          password,
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
    const { email, tempErr, show, dashboard, pop, vis } = this.state;
    const { errors, reset } = this.props;

    return (
      <div className="auth-container">
        <div className="header">
          <img src="/assets/logo.png" alt="Haima Logo" />
          <Link to="/">
            <span>Home</span>
          </Link>
        </div>
        <h1>Login to Your Account</h1>
        <p className="subtext">
          Pay anywhere and anytime with our cutting-edge biometric payment
          solution.{" "}
        </p>
        {dashboard && <Navigate to="/" replace={true} />}
        <div className="inner-form">
          <form action="" onSubmit={this.handleSubmit}>
            {!errors.message ? (
              ""
            ) : (
              <div className="alert-danger">{errors.message}</div>
            )}
            {!tempErr ? "" : <div className="alert-danger">{tempErr}</div>}
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
            <div className="links">
              <button
                type="submit"
                className={`btn ${this.state.view ? "btn-load" : ""}`}
              >
                <span className="btn_text">Log in</span>
                <img src={next} alt="next img" />
              </button>
            </div>
            <img src={swiggle} className="swiggle" alt="swiggle" />
            <p className="signup">
              <span>Don’t have an account yet? </span>
              <a href="/signup">Sign Up Now!</a>
            </p>
            <p className="forgot">Forgot Password?</p>
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
