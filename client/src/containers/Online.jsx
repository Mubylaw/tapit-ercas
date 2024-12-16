import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/demo.css";
import { connect } from "react-redux";
import next from "../assets/svg/arrownext.svg";
import Lottie from "lottie-react";
import fingerAni from "../assets/anime/finger.json";
import { getPaymentUrl } from "../store/actions/payment";
import { splitAmount } from "../utils/seed";

const Online = ({ getPaymentUrl, currentUser, url }) => {
  const [type, setType] = useState(false);
  const [finger, setFinger] = useState(false);
  const [view, setView] = useState(false);
  const [price, setPrice] = useState(10000);
  const [min, setMin] = useState(4500);
  const [max, setMax] = useState(5500);

  const navigate = useNavigate();

  const formatNumberWithCommas = (number) => {
    return number
      ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "";
  };

  useEffect(() => {
    const path = window.location.search;
    const id = path.split("=").pop();
    const money = parseInt(id);
    if (typeof money === "number" && money > 100 && money < 1000000) {
      setPrice(money);
      const val = splitAmount(money);
      setMax(val[0]);
      setMin(val[1]);
    }
  }, []);

  const handleNav = (loc) => {
    navigate(loc);
  };

  const handlePay = () => {
    const { user } = currentUser;
    setView(true);
    getPaymentUrl({
      email: user.email ? user.email : "anonymous@gmail.com",
      name: user.firstName ? user.firstName : "Anonymous",
      price: price / 100,
    });
  };

  useEffect(() => {
    if (url && typeof url === "string") {
      window.location = url;
    }
  }, [url]);

  const handleBiometrics = () => {
    if (window.PublicKeyCredential) {
      // Generate a challenge (example: a random 32-byte buffer)
      const challenge = new Uint8Array(32); // Create a 32-byte Uint8Array
      window.crypto.getRandomValues(challenge); // Fill it with cryptographically secure random values

      // Generate a user ID (example: using a string and converting it to Uint8Array)
      const userId = new TextEncoder().encode("1234"); // Encode the user ID as UTF-8

      const options = {
        publicKey: {
          rp: { id: "tapit-ercas.onrender.com", name: "Neon Ercas" },
          user: {
            id: userId, // Use the Uint8Array for the user ID
            name: "Neon Ercas API",
            displayName: "Tappit",
          },
          challenge: challenge, // Use the generated challenge
          pubKeyCredParams: [{ type: "public-key", alg: -7 }],
          authenticatorSelection: {},
          // Additional options can be added here
        },
      };

      // Create a new credential
      navigator.credentials
        .create(options)
        .then((credential) => {
          // Handle the created credential
          console.log("Credential created:", credential);
          handleNav("/success");
        })
        .catch((error) => {
          console.error("Error creating credential:", error);
          handleNav("/failed");
        });

      // Uncomment if you want to get existing credentials
      // navigator.credentials.get(options);
    } else {
      alert("Cannot use biometrics on this device, try another device");
    }
  };

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
      {finger ? (
        <div className="onp anime">
          <div className="ans">
            <Lottie animationData={fingerAni} />
          </div>
          <div className="btn" onClick={() => handleBiometrics()}>
            Authenticate with Biometrics
          </div>
        </div>
      ) : (
        <div className="onp">
          <h2>Online Payment</h2>

          <div className="bloc">
            <div className="img">
              <img src="/assets/chow.png" alt="" />
            </div>
            <div className="deets">
              <div className="sub">Chowdeck</div>
              <div className="deet">
                2 Packs of big burgers, 1 Pack of Chicken and fries
              </div>
              <div className="addy">
                180 Freedom Way, Eti-Osa, Lekki 101502, Lagos
              </div>
            </div>
          </div>
          <div className="line">
            <div className="item">Burgers</div>
            <div className="price">₦{formatNumberWithCommas(min)}</div>
          </div>
          <div className="line">
            <div className="item">Chicken and Fries</div>
            <div className="price">₦{formatNumberWithCommas(max)}</div>
          </div>
          <div className="tots">
            <div className="item">Total</div>
            <div className="price">₦{formatNumberWithCommas(price)}</div>
          </div>
          {type ? (
            <div className="types">
              <div className="item" onClick={() => setFinger(true)}>
                <div className="up">
                  <img src="/assets/print.png" alt="" />
                  <span>Use Fingerprint</span>
                </div>
                <img src={next} alt="" />
              </div>
              <div
                className={`item ${view ? "btn-load" : ""}`}
                onClick={handlePay}
              >
                <div className="up">
                  <img src="/assets/pay.png" alt="" />
                  <span className="btn_text">Other Payment Methods</span>
                </div>
                <img src={next} alt="" />
              </div>
            </div>
          ) : (
            <>
              <div className="btn" onClick={() => setType(true)}>
                Checkout
              </div>
              <div className="pow">
                <img src="/assets/pow.png" alt="" />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return { url: state.payment.url };
}

export default connect(mapStateToProps, { getPaymentUrl })(Online);
