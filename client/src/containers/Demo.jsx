import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/demo.css";
import { connect } from "react-redux";
import Options from "../components/Options";

const Demo = ({}) => {
  const [amount, setAmount] = useState("");
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
      <Options amount={amount} setAmount={setAmount} />
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Demo);
