import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/demo.css";
import { connect } from "react-redux";
import Lottie from "lottie-react";
import success from "../assets/anime/success.json";

const Success = ({}) => {
  return (
    <div className="demo-home">
      <div className="header">
        <div className="logo">
          <img src="/assets/logo.png" alt="" />
        </div>
        <div className="hom">
          <a href="/">Home</a>
        </div>
      </div>
      <div className="onp">
        <div className="item">
          <div className="cont">
            <Lottie animationData={success} />
          </div>
          <div className="borsa">
            <h2>Transaction successful</h2>
            <p>
              Items purchased will be delivered to you in the next 20 minutes.
              In case of any queries please reach out to us on 08123456789{" "}
            </p>
          </div>
        </div>

        <div className="again">
          <a href="/">Go home</a>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Success);
