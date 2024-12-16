import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/landing.css";
import check from "../assets/svg/check.svg";
import print from "../assets/svg/print.svg";
import shop from "../assets/svg/shop.svg";
import face from "../assets/svg/face.svg";
import select from "../assets/svg/select.svg";
import { connect } from "react-redux";

const Landing = ({}) => {
  return (
    <div className="landing-home">
      <div className="hero">
        <div className="top">
          <div className="content">
            <div className="header">
              <div className="logo">
                <img src="/assets/logo.png" alt="" />
              </div>
              <div className="links">
                <div className="nav-link">
                  <a href="/">Home</a>
                </div>
                <div className="nav-link">
                  <a href="/demo">Demo</a>
                </div>
                <div className="nav-link">
                  <a href="/signup">Sign Up</a>
                </div>
              </div>
            </div>
            <div className="poster">
              <div className="powe">
                Powered by <span>Ercas</span>
              </div>
              <h1>Payment, right at your Fingertips</h1>
              <p>
                Pay anywhere and anytime with our cutting-edge biometric payment
                solution.
              </p>
              <div className="btn">
                <a href="/demo">Start Demo</a>
              </div>
              <div className="bens">
                <div className="item">
                  <img src={check} alt="" />
                  <span>Simple</span>
                </div>
                <div className="item">
                  <img src={check} alt="" />
                  <span>Fast</span>
                </div>
                <div className="item">
                  <img src={check} alt="" />
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
          <div className="img">
            <img src="/assets/Illustration.png" alt="" />
          </div>
        </div>
        <div className="feats">
          <div className="item">
            <div className="text">
              <div className="top">
                <span>3</span> <span className="tiny">secs</span>
              </div>
              <p>Average transaction time</p>
            </div>
            <div className="icon">+</div>
          </div>

          <div className="item">
            <div className="text">
              <div className="top">100</div>
              <p>Fraud Proof</p>
            </div>
            <div className="icon">%</div>
          </div>

          <div className="item">
            <div className="text">
              <div className="top big">∞</div>
              <p>For Everyone</p>
            </div>
            <div className="icon">*</div>
          </div>
        </div>
      </div>
      <div className="how">
        <div className="title">How it Works</div>
        <div className="const">
          <div className="item">
            <div className="img">
              <img src={print} alt="" />
            </div>
            <div className="sub">
              Link your fingerprint to your Bank account
            </div>
            <p>
              Easily link your fingerprint to your payment account through our
              app.
            </p>
          </div>
          <div className="item">
            <div className="img">
              <img src={select} alt="" />
            </div>
            <div className="sub">Pay with a Touch</div>
            <p>
              Use your fingerprint to authenticate online or POS payments
              effortlessly, no need for cards or PINs.
            </p>
          </div>
          <div className="item">
            <div className="img">
              <img src={shop} alt="" />
            </div>
            <div className="sub">Turn on Biometrics</div>
            <p>
              Enable biometrics on your dashboard to allow you use fingerprint
              authentication for payments.{" "}
            </p>
          </div>
          <div className="item">
            <div className="img">
              <img src={face} alt="" />
            </div>
            <div className="sub">No Fingerprints, No Problem</div>
            <p>Switch to Face ID biometric authentication at any time.</p>
          </div>
          <div className="img sm">
            <img src="/assets/phone.png" alt="" />
          </div>
        </div>
      </div>
      <div className="atm">
        <div className="inner">
          <div className="const">
            <div className="title">What ATM Cards?</div>
            <p>
              Users can forget about outdated, fraud-prone ATM cards. Our
              technology securely links their biometrics to their bank accounts,
              automating transfers with a single touch.
            </p>
            <div className="btn">
              <a href="/demo">Start Demo</a>
            </div>
          </div>
        </div>
      </div>
      <div className="cases">
        <div className="content">
          <div className="title">Use Cases</div>
          <div className="item">
            <div className="sub">For Merchants</div>
            <p>
              Customers can now make payments in stores, restaurants, or any
              business with just a tap of their fingerprint—quick, secure, and
              effortless.
            </p>
          </div>
          <div className="item">
            <div className="sub">For POS Payments and Withdrawals</div>
            <p>
              Seamlessly pay or withdraw funds with just a tap—no cards, no
              hassle.
            </p>
          </div>
          <div className="item">
            <div className="sub">Online Payment</div>
            <p>
              Fingerprint authentication is the fastest and most efficient
              payment method available in Nigeria.
            </p>
          </div>
          <div className="btn">
            <a href="/demo">Start Demo</a>
          </div>
        </div>
        <div className="img">
          <img src="/assets/div.png" alt="" />
        </div>
      </div>
      <div className="footer">
        <div className="logo">
          <img src="/assets/logo.png" alt="" />
        </div>
        <div className="split">
          <div className="top">Tapit 2024.</div>
          <div className="bots">
            <div className="links">
              <div className="nav-link">
                <a href="/">Home</a>
              </div>
              <div className="nav-link">
                <a href="/demo">Demo</a>
              </div>
              <div className="nav-link">
                <a href="/signup">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Landing);
