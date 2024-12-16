import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/demo.css";
import { connect } from "react-redux";

const Pos = ({}) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step !== 4 && step !== 3) {
      setStep(step + 1);
    } else if (step === 3) {
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
            setStep(4);
          })
          .catch((error) => {
            console.error("Error creating credential:", error);
            navigate("/failed");
          });

        // Uncomment if you want to get existing credentials
        // navigator.credentials.get(options);
      } else {
        alert("Cannot use biometrics on this device, try another device");
      }
    } else {
      navigate("/");
    }
  };

  const smm = ["(Merchant)", "(Merchant)", "(Customer)", "Complete"];
  const bgg = [
    "Collect Payment ",
    "Put in Amount",
    "Provide Fingerprint",
    "Transaction",
  ];

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
      <div className="psp">
        <div className="text">
          <h1>{bgg[step - 1]}</h1>
          <h1>{smm[step - 1]}</h1>
          <div className="btn" onClick={handleNext}>
            {step === 4 ? "Go Home" : "Next"}
          </div>
        </div>
        <div className="img">
          <img src={`/assets/pos (${step}).png`} alt="" />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Pos);
