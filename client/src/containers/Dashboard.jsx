import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/dashboard/dashboard.css";
import { logout, getUserFn } from "../store/actions/auth";
import { connect } from "react-redux";
import menu from "../assets/svg/menu.svg";

const Dashboard = ({ logout, user, getUserFn }) => {
  const [bio, setBio] = useState(false);
  const [close, setClose] = useState(false);
  useEffect(() => {
    if (!user.lastName) {
      getUserFn(user.id);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  console.log(bio);

  return (
    <div className="home">
      <div className="header">
        <img src="/assets/bro.png" alt="" className="bro" />
        <img src="/assets/logo.png" alt="" className="logo" />
        <img
          src={menu}
          alt=""
          className="menu"
          onClick={() => setClose(true)}
        />
      </div>
      <div className={`nav ${close ? "" : "close"}`}>
        <div className="icon" onClick={() => setClose(false)}>
          <span></span>
          <span></span>
        </div>
        <div className="link">
          <a href="/account">Create a new Account</a>
        </div>
        <div className="link">
          <a href="/demo">Make a payment</a>
        </div>
        <div className="link">
          <a href="/card">Add a card</a>
        </div>
        <div className="link">
          <a href="" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
      <div className="tile">
        <div className="top">
          <div className="name">
            {user.firstName} {user.lastName}
          </div>
          <div className="amount">₦540,120.48</div>
          <div className="name min">Account Connected</div>
          <div className="name min">
            {user.bank} {user.accountNo}
          </div>
        </div>
        <div className="bottom">
          <div className="cir"></div>
          <div className="bio" onClick={() => setBio(!bio)}>
            <span className={`drop ${bio ? "" : "red"}`}></span>
            <span>Biometrics Payment {bio ? "Enabled" : "Disabled"}</span>
          </div>
        </div>
      </div>
      <div className="finger">
        <img
          src={bio ? "/assets/green.png" : "/assets/red.png"}
          alt=""
          onClick={() => setBio(!bio)}
        />
        <p>Click on the Fingerprint to turn off biometrics payment</p>
      </div>
      <div className="recent">
        <div className="subtitle">Recent Payments</div>
        <div className="pays">
          <div className="duo">
            <div className="item">
              <div className="up">
                <img src="/assets/bank.png" alt="" />
                <div className="deets">
                  <div className="name">MoniePoint</div>
                  <div className="type">Online Payment</div>
                </div>
              </div>
              <div className="amount">₦31,000.00</div>
            </div>
            <div className="item">
              <div className="up">
                <img src="/assets/bank (1).png" alt="" />
                <div className="deets">
                  <div className="name">FirstBank</div>
                  <div className="type">In-app Transfer</div>
                </div>
              </div>
              <div className="amount">₦38,000.00</div>
            </div>
          </div>
          <div className="duo">
            <div className="item">
              <div className="up">
                <img src="/assets/bank (3).png" alt="" />
                <div className="deets">
                  <div className="name">GTB</div>
                  <div className="type">POS Payment</div>
                </div>
              </div>
              <div className="amount">₦5,100.00</div>
            </div>
            <div className="item">
              <div className="up">
                <img src="/assets/bank (2).png" alt="" />
                <div className="deets">
                  <div className="name">Access</div>
                  <div className="type">Online Payment</div>
                </div>
              </div>
              <div className="amount">₦31,000.00</div>
            </div>
          </div>
          <div className="duo">
            <div className="item">
              <div className="up">
                <img src="/assets/bank.png" alt="" />
                <div className="deets">
                  <div className="name">MoniePoint</div>
                  <div className="type">Online Payment</div>
                </div>
              </div>
              <div className="amount">₦150,000.00</div>
            </div>
            <div className="item">
              <div className="up">
                <img src="/assets/bank (3).png" alt="" />
                <div className="deets">
                  <div className="name">GTB</div>
                  <div className="type">POS Payment</div>
                </div>
              </div>
              <div className="amount">₦500.00</div>
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

export default connect(mapStateToProps, {
  logout,
  getUserFn,
})(Dashboard);
